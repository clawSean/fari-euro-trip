# Fari Euro Trip

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)

A public-safe, mobile-first trip companion for a flexible London and Italy
route. It includes a coast comparison, scheduled destination Spotlights, and a
private-on-device planning questionnaire.

## Privacy model

- Public: broad dates, cities, destination comparisons, and inspiration.
- Private: hotels, budgets, booking details, screenshots, and live location.
- Questionnaire answers remain in browser local storage until the visitor
  explicitly copies them.
- The deployed site is static and does not expose the original trip-chat API.

## Development

```bash
npm ci
npm run check
npm test
npm run build
```

Static output is written to `dist/public/`.
