
// Remove trailing and leading spaces from text, expect spaces between words
export const getRemoveWhitespace = (textValue: string): string => {
  return textValue.replace(/^\s+|\s+$/g, '');
}
