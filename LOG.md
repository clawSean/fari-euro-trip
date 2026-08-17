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
