// Adds the appropriate ordinal suffix based on the rules of English ordinal numbers
// ex: 1st, 2nd, 3rd, 4th, 5th, etc.
export function getOrdinalSuffix(num: number) {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const tensDigit = Math.floor(num / 10) % 10;
  const onesDigit = num % 10;

  if (tensDigit === 1 || onesDigit === 0 || onesDigit >= 4) {
    return suffixes[0];
  }

  if (onesDigit === 1) return suffixes[1];
  if (onesDigit === 2) return suffixes[2];

  return suffixes[3];
}
