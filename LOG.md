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
