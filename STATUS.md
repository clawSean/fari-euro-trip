# Status

## Current phase

Initial public-safe MVP is live and verified.

## Scope

- Broad route: London → Florence → coast TBD → Rome.
- Coast comparison: Positano, Amalfi, Cinque Terre.
- Six scheduled daily Spotlights.
- Private-on-device Gelato questionnaire with copy-to-Telegram handoff.
- No public chat backend and no sensitive itinerary fields.

## Live surfaces

- Site: `https://euro.jpop.cloud`
- Repository: `https://github.com/clawSean/fari-euro-trip`
- VPS static root: `/srv/websites/euro.jpop.cloud`

## Verification

- TypeScript: passed.
- Tests: 12/12 passed.
- Production build: passed.
- Caddy config validation and graceful reload: passed.
- HTTPS/TLS and security headers: HTTP 200 verified.
- Mobile browser: route, comparison, and private planning tabs rendered.
- Privacy smoke: zero `/api/` requests; planning answers persist locally.
- Hero: original editorial Europe/yacht illustration at
  `client/public/euro/hero-baddies-lobster.jpg`.

## Next

1. Add Fari/Storm's voluntary budget answers when shared privately.
2. Enrich each scheduled Spotlight as its release date arrives.
3. Update the coast comparison with live lodging and boat availability.
