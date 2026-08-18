# Fari Euro Trip

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)

A public-safe, mobile-first trip companion for a flexible London and Italy
route. It includes a coast comparison, scheduled destination Spotlights, and a
shared Gelato trip chat.

## Privacy model

- Public: broad dates, cities, destination comparisons, and inspiration.
- Private: hotels, budgets, booking details, screenshots, and live location.
- Gelato messages are stored in the site's isolated SQLite chat database and
  are visible to people using this trip site.
- Chat history is not published into the site's editorial content or shared
  with the separate `italy.jpop.cloud` chat.

## Development

```bash
npm ci
npm run check
npm test
npm run build
```

Static output is written to `dist/public/`.
