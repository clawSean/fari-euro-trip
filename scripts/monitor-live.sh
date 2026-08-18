#!/usr/bin/env bash
set -uo pipefail

site_url="https://euro.jpop.cloud"
http_url="http://euro.jpop.cloud"
vps_target="root@100.122.114.48"
vps_key="/Users/Sean/.ssh/id_ed25519_vps_control"
vps_known_hosts="/Users/Sean/.ssh/known_hosts_vps_control"

monitor_tmp_dir="$(mktemp -d)"
html_file="${monitor_tmp_dir}/index.html"
chat_file="${monitor_tmp_dir}/chat.json"

cleanup() {
  /bin/rm -f "$html_file" "$chat_file"
  /bin/rmdir "$monitor_tmp_dir" 2>/dev/null || true
}
trap cleanup EXIT

probe() {
  local protocol="$1"
  local output_file="$2"
  local url="$3"
  local result

  if result="$(/usr/bin/curl --silent --show-error --max-time 20 --connect-timeout 8 "$protocol" \
    --output "$output_file" \
    --write-out '%{http_code}|%{http_version}|%{time_starttransfer}|%{time_total}|%{size_download}' \
    "$url")"; then
    printf '%s' "$result"
  else
    printf '000|0|0|20|0'
  fi
}

h1_metrics="$(probe --http1.1 "$html_file" "$site_url")"
h2_metrics="$(probe --http2 /dev/null "$site_url")"
chat_metrics="$(probe --http2 "$chat_file" "${site_url}/api/chat/messages?view=chat")"

IFS='|' read -r h1_code h1_version h1_ttfb h1_total h1_bytes <<< "$h1_metrics"
IFS='|' read -r h2_code h2_version h2_ttfb h2_total h2_bytes <<< "$h2_metrics"
IFS='|' read -r chat_code chat_version chat_ttfb chat_total chat_bytes <<< "$chat_metrics"

redirect_metrics="$(/usr/bin/curl --silent --show-error --max-time 15 --connect-timeout 8 \
  --output /dev/null --write-out '%{http_code}|%{redirect_url}' "$http_url" 2>/dev/null || printf '000|')"
IFS='|' read -r redirect_code redirect_url <<< "$redirect_metrics"

asset_count=0
asset_failures=0
if [[ -s "$html_file" ]]; then
  while IFS= read -r asset_path; do
    [[ -z "$asset_path" ]] && continue
    asset_count=$((asset_count + 1))
    asset_code="$(/usr/bin/curl --silent --show-error --max-time 15 --connect-timeout 8 \
      --output /dev/null --write-out '%{http_code}' "${site_url}${asset_path}" 2>/dev/null || printf '000')"
    [[ "$asset_code" == "200" ]] || asset_failures=$((asset_failures + 1))
  done < <(/usr/bin/grep -oE '/assets/[^" ]+\.(js|css)' "$html_file" | /usr/bin/sort -u)
fi

remote_metrics="$(/usr/bin/ssh \
  -i "$vps_key" \
  -o BatchMode=yes \
  -o ConnectTimeout=10 \
  -o StrictHostKeyChecking=yes \
  -o UserKnownHostsFile="$vps_known_hosts" \
  "$vps_target" \
  "caddy_state=\$(systemctl is-active caddy 2>/dev/null || true); chat_state=\$(systemctl is-active euro-chat-api.service 2>/dev/null || true); chat_errors=\$(journalctl -u euro-chat-api.service --since '24 hours ago' --no-pager 2>/dev/null | grep -Eic 'error|exception|fatal|unhandled|failed to' || true); euro_edge_errors=\$(journalctl -u caddy --since '24 hours ago' --no-pager -p err 2>/dev/null | grep -Ec 'euro\.jpop\.cloud' || true); printf '%s|%s|%s|%s' \"\$caddy_state\" \"\$chat_state\" \"\$chat_errors\" \"\$euro_edge_errors\"" \
  2>/dev/null || printf 'unreachable|unreachable|-1|-1')"
IFS='|' read -r caddy_state chat_state chat_errors euro_edge_errors <<< "$remote_metrics"

state="healthy"
reasons=()

mark_degraded() {
  state="degraded"
  reasons+=("$1")
}

mark_watch() {
  if [[ "$state" == "healthy" ]]; then
    state="watch"
  fi
  reasons+=("$1")
}

[[ "$h1_code" == "200" ]] || mark_degraded "HTTP/1.1 returned ${h1_code}"
[[ "$h2_code" == "200" && "$h2_version" == "2" ]] || mark_degraded "HTTP/2 returned ${h2_code} over v${h2_version}"
[[ "$chat_code" == "200" ]] || mark_degraded "Gelato read API returned ${chat_code}"
[[ "$redirect_code" == "301" || "$redirect_code" == "308" ]] || mark_degraded "bare HTTP redirect returned ${redirect_code}"
[[ "$redirect_url" == "${site_url}/" ]] || mark_degraded "bare HTTP redirect target changed"
[[ "$asset_count" -ge 2 && "$asset_failures" == "0" ]] || mark_degraded "asset probe found ${asset_failures} failures across ${asset_count} assets"
[[ "$caddy_state" == "active" ]] || mark_degraded "Caddy is ${caddy_state}"
[[ "$chat_state" == "active" ]] || mark_degraded "Gelato service is ${chat_state}"
[[ "$chat_errors" == "0" ]] || mark_degraded "Gelato logged ${chat_errors} error-like lines in 24h"
[[ "$euro_edge_errors" == "0" ]] || mark_degraded "Caddy logged ${euro_edge_errors} Euro host errors in 24h"

if /usr/bin/awk -v total="$h2_total" 'BEGIN { exit !(total > 4) }'; then
  mark_degraded "HTTP/2 total time is ${h2_total}s"
elif /usr/bin/awk -v total="$h2_total" 'BEGIN { exit !(total > 1.5) }'; then
  mark_watch "HTTP/2 total time is elevated at ${h2_total}s"
fi

if /usr/bin/awk -v total="$chat_total" 'BEGIN { exit !(total > 3) }'; then
  mark_degraded "Gelato total time is ${chat_total}s"
elif /usr/bin/awk -v total="$chat_total" 'BEGIN { exit !(total > 1.5) }'; then
  mark_watch "Gelato total time is elevated at ${chat_total}s"
fi

reason_text="none"
if [[ ${#reasons[@]} -gt 0 ]]; then
  reason_text="$(IFS='; '; printf '%s' "${reasons[*]}")"
fi

printf 'state=%s h1=%s/v%s h1_ttfb=%ss h1_total=%ss h2=%s/v%s h2_ttfb=%ss h2_total=%ss html_bytes=%s assets=%s asset_failures=%s redirect=%s chat=%s chat_ttfb=%ss chat_total=%ss chat_bytes=%s caddy=%s gelato_service=%s chat_errors_24h=%s edge_errors_24h=%s reasons=%s\n' \
  "$state" "$h1_code" "$h1_version" "$h1_ttfb" "$h1_total" "$h2_code" "$h2_version" "$h2_ttfb" "$h2_total" "$h2_bytes" "$asset_count" "$asset_failures" "$redirect_code" "$chat_code" "$chat_ttfb" "$chat_total" "$chat_bytes" "$caddy_state" "$chat_state" "$chat_errors" "$euro_edge_errors" "$reason_text"

[[ "$state" != "degraded" ]]
