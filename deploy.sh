#!/bin/bash
set -euo pipefail

script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$script_dir"

vps_target="${VPS_TARGET:-root@100.122.114.48}"
vps_key="${VPS_KEY:-/Users/Sean/.ssh/id_ed25519_vps_control}"
vps_known_hosts="${VPS_KNOWN_HOSTS:-/Users/Sean/.ssh/known_hosts_vps_control}"
remote_root="/srv/websites/euro.jpop.cloud"
rsync_ssh="/usr/bin/ssh -i ${vps_key} -o BatchMode=yes -o ConnectTimeout=10 -o StrictHostKeyChecking=yes -o UserKnownHostsFile=${vps_known_hosts}"
ssh_args=(
  -i "$vps_key"
  -o BatchMode=yes
  -o ConnectTimeout=10
  -o StrictHostKeyChecking=yes
  -o UserKnownHostsFile="$vps_known_hosts"
)

echo "🏗️  Building..."
npm run build

echo "🚀 Deploying to ${vps_target}:${remote_root}..."
/usr/bin/rsync -az --delete -e "$rsync_ssh" dist/public/ "${vps_target}:${remote_root}/"

/usr/bin/ssh "${ssh_args[@]}" "$vps_target" \
  "/usr/bin/chown -R caddy:caddy '${remote_root}' && /usr/bin/find '${remote_root}' -type d -exec /usr/bin/chmod 0755 {} + && /usr/bin/find '${remote_root}' -type f -exec /usr/bin/chmod 0644 {} +"

echo "✅ Done!"
