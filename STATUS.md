# Status

## Current phase

Public-safe trip companion with shared Gelato chat is live and verified.

## Scope

- Broad route: London → Florence → coast TBD → Rome.
- Coast comparison: Positano, Amalfi, Cinque Terre.
- Six scheduled daily Spotlights.
- Full Gelato shared chat: nicknames, persistent history, unread state, and links.
- Isolated SQLite backend; no message crossover with `italy.jpop.cloud`.

## Live surfaces

- Site: `https://euro.jpop.cloud`
- Repository: `https://github.com/clawSean/fari-euro-trip`
- VPS static root: `/srv/websites/euro.jpop.cloud`
- Chat API: `/api/chat/messages` → `127.0.0.1:3013`
- Service: `euro-chat-api.service`
- Chat app/data: `/srv/apps/euro-chat-api`

## Verification

- TypeScript: passed.
- Tests: 14/14 passed, including mocked storage-denied coverage.
- Production build: passed.
- Caddy config validation and graceful reload: passed.
- HTTPS/TLS and security headers: HTTP 200 verified.
- Mobile edge transport: the exact incident-time UFW log showed Safari's QUIC
  request blocked on UDP 443. After opening the firewall exposed a second issue
  in the VPS's old Caddy 2.6.2 build, iOS WebKit received an HTTP/3 internal
  error while HTTP/2 stayed healthy. `euro.jpop.cloud` now sends `Alt-Svc:
  clear`, so clients use the proven HTTP/1.1 or HTTP/2 path until Caddy can be
  upgraded and HTTP/3 retested.
- Bare-host compatibility: an explicit IPv4 port-80 listener works around
  Caddy multi-bind bug #6226 and redirects `http://euro.jpop.cloud` to HTTPS.
  HTTP and HTTPS both passed from 10/10 global probes.
- Production chat round-trip passed through the browser and API; synthetic
  smoke message was removed afterward.
- Mobile browser: expanded chat fits a 390×844 viewport with no horizontal
  overflow.
- Mobile cold load: a true 390px navigation downloads exactly one responsive
  hero and roughly 0.6 MB from the origin instead of the previous 4.3 MB.
  Gelato, avatar, favicon, and home-screen images are now sized for their actual
  rendering roles; fingerprinted assets receive immutable caching.
- Safari hardening: explicit Safari 13 build target, no `:has()` or CSS
  `content:url()` dependency in the hero, guarded local storage, and a render
  error boundary.
- Hero: identity-preserving editorial speedboat portrait of Fari and Storm at
  `client/public/euro/hero-fari-storm.jpg`, with a dedicated portrait companion
  at `client/public/euro/hero-fari-storm-mobile.jpg` so both faces survive the
  phone crop.

## Next

1. Collect Fari and Storm's public creator-platform links, preferred display
   names, platform priority, and consent for placement.
2. Review the Grok/Sol/Opus creator-promotion proposals and ship the selected
   small, high-impact creator features.
3. Use Gelato to collect Fari/Storm's hotel, boat, priority, and luggage inputs.
4. Enrich each scheduled Spotlight as its release date arrives.
5. Update the coast comparison with live lodging and boat availability.
6. With explicit operations approval, upgrade Caddy from 2.6.2 and retest
   Apple/Chrome HTTP/3 before removing the host-scoped `Alt-Svc: clear` header.

## Standing product mandate

`AGENTS.md` is the binding project brief: all future changes must remain pretty,
mobile UX-optimized, baddie-focused, creator-forward, and equally attentive to
Gelato. The site may move quickly because it is temporary, but public chat content
must not override server policy, reveal private data, or authorize privileged
actions.
