# Log

- 2026-08-17: Forked the current ItalyTrip source into an isolated project.
- 2026-08-17: Replaced the shared public chat with a local-only planning desk.
- 2026-08-17: Added public route, coast comparison, privacy boundary, and six
  daily destination Spotlights.
- 2026-08-17: Published `clawSean/fari-euro-trip`, deployed the static bundle to
  `euro.jpop.cloud`, added CSP/permissions/privacy headers, and verified HTTPS.
- 2026-08-17: Fixed inherited rsync permissions after the first smoke produced
  a real 404; normalized the web root to Caddy-readable 0755/0644 and verified
  HTTP 200. Future deploys must repeat ownership/mode normalization.
- 2026-08-17: Mobile browser verified all primary tabs. The planning form made
  no API requests and persisted a synthetic answer only in local storage.
- 2026-08-17: Fixed desktop route arrows that were clipped by each card's
  `overflow-hidden`; arrows now sit visibly in the grid gaps on their own
  bordered background.
- 2026-08-17: Generated and added an original wide editorial hero illustration:
  two stylish adult friends and a dapper moustached, hoop-earring lobster on a
  yacht, with London/Florence/Italian-coast/Rome motifs and left-side negative
  space for the headline. Built-in image generation path; no face references.
- 2026-08-17: Deployed commit `c6ccfbb`. Live browser proof confirmed the hero
  loaded at 1823×863, all three desktop arrows render in the inter-card gaps,
  mobile hides those decorative arrows, and the 390px viewport has no horizontal
  overflow.
- 2026-08-17: Restored the complete Gelato shared-chat UI and removed the
  questionnaire tab so planning is one conversation rather than two competing
  systems. Added the isolated `euro-chat-api.service` on port 3013 with its own
  SQLite database, routed `/api/*` through Caddy, seeded the planning opener,
  and verified a real production send/read round-trip. Removed the synthetic QA
  message after proof; 390×844 expanded-chat layout has no horizontal overflow.
