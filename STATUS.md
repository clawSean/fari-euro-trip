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
- Tests: 12/12 passed.
- Production build: passed.
- Caddy config validation and graceful reload: passed.
- HTTPS/TLS and security headers: HTTP 200 verified.
- Production chat round-trip passed through the browser and API; synthetic
  smoke message was removed afterward.
- Mobile browser: expanded chat fits a 390×844 viewport with no horizontal
  overflow.
- Hero: original editorial Europe/yacht illustration at
  `client/public/euro/hero-baddies-lobster.jpg`.

## Next

1. Use Gelato to collect Fari/Storm's hotel, boat, priority, and luggage inputs.
2. Enrich each scheduled Spotlight as its release date arrives.
3. Update the coast comparison with live lodging and boat availability.
