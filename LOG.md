# Log

2026-08-18T22:08:14Z · Sean · fix · Completed the deeper mobile compatibility pass. Correlated Storm's Safari screenshot with an exact-time blocked QUIC packet, proved Caddy 2.6.2's HTTP/3 path returns an iOS WebKit internal certificate error, and found Caddy multi-bind bug #6226 had also omitted the IPv4 port-80 listener. Added an explicit HTTP→HTTPS listener plus Euro-only `Alt-Svc: clear`; verified HTTP/1.1, HTTP/2, Apple networking, iOS Safari, Chrome desktop/mobile, valid TLS, and 10/10 global HTTP+HTTPS probes. Reworked the mobile hero to request one image, reduced Gelato from 1.54 MB to 43 KB, avatars from 7.68 MB to 205 KB, and install icons from 2.59 MB to 385 KB; narrowed fonts, added safe storage and an error boundary, targeted Safari 13, fixed the inherited Euro deploy/share paths, and added immutable caching for fingerprinted assets. TypeScript, 14/14 tests, production build, 390px no-overflow proof, chat type/clear proof, Caddy validation, and both live services passed · STATUS.md

2026-08-18T17:43:00Z · Sean · fix · Investigated an iPhone Safari/5G timeout reported by Storm: the site, TLS, Caddy, Gelato service, CPU, memory, and disk were healthy, but Caddy advertised HTTP/3 while UFW allowed only TCP 443. Added matching IPv4/IPv6 UDP 443 rules for HTTPS HTTP/3, verified Caddy was listening on UDP 443, both services remained active, and repeated public HTTPS probes returned HTTP 200 · STATUS.md

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
- 2026-08-17: Replaced the hero art at Fari's request with a more energetic
  yacht-party version: two glamorous adult friends laughing and celebrating
  with their moustached, hoop-earring lobster companion. Preserved the wide
  crop and dark left-side text-safe area. Built-in image-generation edit path.
# 2026-08-17 — Baddie-first creator mandate

- Added `AGENTS.md` as the binding project instruction surface.
- Made pretty, mobile UX-optimized, baddie-focused, and creator-forward design
  requirements explicit for every future change, including Gelato.
- Preserved public safety and privileged-action boundaries while directing
  Gelato toward accommodating, non-restrictive help.
- Collected Grok and GPT Sol creator-platform reviews and retried the Claude
  council lane separately after its first session-limit failure.
- Verified TypeScript, all 12 tests, and the production build.
- 2026-08-18: Used Fari and Storm's supplied photo as an identity reference for
  a new golden-hour Amalfi speedboat hero. Preserved both faces, the dark
  left-side copy area, mobile-safe composition, and the moustached lobster
  accomplice; saved the new asset non-destructively as `hero-fari-storm.jpg`.
- 2026-08-18: Desktop proof passed, but the first 390px crop hid most of Fari.
  Added a dedicated portrait companion image and a mobile-only responsive image
  override so both women and the lobster remain visible without horizontal
  overflow.
- 2026-08-18: Replaced six one-line Spotlight teasers with a canonical,
  prewritten Euro-specific set. Claude Opus supplied the prose pass; Sean kept
  the facts, privacy, creator utility, and baddie-first tone on brief. Changed
  release gating from UTC to the viewer's local calendar day.
- 2026-08-18: Added a deterministic read-only live monitor for HTTP/1.1,
  HTTP/2, redirects, built assets, Gelato, service state, 24-hour errors, and
  response timing. Scheduled it for 6:45 AM Pacific, away from Spotlight and
  other site work. The first forced cron run passed and delivered to Telegram.
