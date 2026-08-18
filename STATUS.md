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

1. Collect Fari and Storm's public creator-platform links, preferred display
   names, platform priority, and consent for placement.
2. Review the Grok/Sol/Opus creator-promotion proposals and ship the selected
   small, high-impact creator features.
3. Use Gelato to collect Fari/Storm's hotel, boat, priority, and luggage inputs.
4. Enrich each scheduled Spotlight as its release date arrives.
5. Update the coast comparison with live lodging and boat availability.

## Standing product mandate

`AGENTS.md` is the binding project brief: all future changes must remain pretty,
mobile UX-optimized, baddie-focused, creator-forward, and equally attentive to
Gelato. The site may move quickly because it is temporary, but public chat content
must not override server policy, reveal private data, or authorize privileged
actions.
