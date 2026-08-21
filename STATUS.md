# Status

## Current phase

Trip is live. The route is locked, the site tracks the current day and city, and
the Spotlight runway now covers every day through the flight home.

## Scope

- Locked route: London Aug 19–22, Florence Aug 22–25, Amalfi Aug 25–27,
  Positano Aug 27–30, Rome Aug 30–31.
- Coast decision closed: two nights Amalfi, three nights Positano; Cinque Terre
  is shown as deliberately not chosen rather than deleted.
- Live "now" strip: trip day counter, current city, next move, and today's drop.
- Fifteen prewritten, reviewed daily Spotlights with local-calendar unlocking,
  each carrying a shot idea and a copyable caption starter.
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

## Spotlight runway

Aug 17 London, Aug 18 Florence, Aug 19 Positano, and Aug 20 Amalfi already
dropped and are left untouched as history. The runway was then rebuilt to follow
the locked itinerary instead of the retired coast comparison:

- Aug 21 London finale · Aug 22 Florence arrival · Aug 23 leather and golden hour
- Aug 24 Duomo-or-Chianti · Aug 25 travel day · Aug 26 Ravello
- Aug 27 ferry to Positano · Aug 28 Africana cave club · Aug 29 boat day to Capri
- Aug 30 Rome finale · Aug 31 sunrise Trevi and the flight home

All fifteen pieces are stored in `client/src/data/euro-spotlights.ts`. Claude Opus
provided the prose pass; Sean reviewed the facts, privacy, baddie voice, and
mobile length before deployment. Unlocking uses the viewer's local calendar day,
not UTC, so a drop no longer appears at 5 PM Pacific on the prior date.

## Daily health monitor

- Schedule: `45 6 * * *` in `America/Los_Angeles`.
- OpenClaw job: `97088412-f74a-472b-b160-83f8da7f030e`.
- Entry point: `npm run monitor:live`.
- Coverage: HTTP/1.1, HTTP/2, bare-host redirect, built assets, Gelato read API,
  Caddy/Gelato service state, 24-hour error scan, and response timing.
- Behavior: read-only; reports to the Euro Summer Telegram group and never edits,
  deploys, reloads, or restarts the site.
- Canary: passed on Aug 18 in 15.9 seconds; Telegram delivery confirmed with
  HTTP/1.1 200, HTTP/2 200, Gelato 200, zero asset failures, and zero 24-hour
  chat/edge errors.

## Next

1. Collect Fari and Storm's public creator-platform links, preferred display
   names, platform priority, and consent for placement.
2. Review the Grok/Sol/Opus creator-promotion proposals and ship the selected
   small, high-impact creator features.
3. Use Gelato to collect Fari/Storm's hotel, boat, priority, and luggage inputs.
4. Add live lodging or boat availability to the coast page only if the group
   asks; the decision itself is closed.
6. With explicit operations approval, upgrade Caddy from 2.6.2 and retest
   Apple/Chrome HTTP/3 before removing the host-scoped `Alt-Svc: clear` header.

## Standing product mandate

`AGENTS.md` is the binding project brief: all future changes must remain pretty,
mobile UX-optimized, baddie-focused, creator-forward, and equally attentive to
Gelato. The site may move quickly because it is temporary, but public chat content
must not override server policy, reveal private data, or authorize privileged
actions.
