export const URL_PART_PATTERN = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
const TRAILING_URL_PUNCTUATION_PATTERN = /[.,!?;:)]*$/;

export function splitUrlTrailingPunctuation(value: string) {
  const punctuation = value.match(TRAILING_URL_PUNCTUATION_PATTERN)?.[0] ?? "";
  if (!punctuation) {
    return { urlText: value, trailing: "" };
  }
  return {
    urlText: value.slice(0, -punctuation.length),
    trailing: punctuation,
  };
}

export function normalizeHref(value: string) {
  return value.startsWith("www.") ? `https://${value}` : value;
}
