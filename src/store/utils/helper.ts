
export const extractNumberFromBookmarkId = (bookmarkId: string | undefined) => {
  if (bookmarkId === undefined) {
    return 0;
  }

  const matchNumberFromString = bookmarkId.match(/\d+/);
  return matchNumberFromString ? parseInt(matchNumberFromString[0]) : 0;
}

export const sortBookmarks = (bookmarks: string[]): string[] => {
  return [...bookmarks].sort((a, b) => {
    const numberA = extractNumberFromBookmarkId(a);
    const numberB = extractNumberFromBookmarkId(b);
    return numberA - numberB;
  });
};

// (bookmarkId: string) => boolean is the type declaration
// export const doesBookmarkIdContainDigits: (bookmarkId: string) => boolean = (bookmarkId: string) => {
//   const doesItContainDigits = /\d$/;
//   return doesItContainDigits.test(bookmarkId);
// }

// // (bookmarkId: string) => boolean is the type declaration
export const doesBookmarkIdHaveValidFormat: (bookmarkId: string) => boolean = (bookmarkId: string) => {
  // Does it contain hyphen separated letters from a to z
  // with one number at the end
  const validFormat = /^[-a-zA-Z]+-[0-9]+$/;
  return validFormat.test(bookmarkId);
}
