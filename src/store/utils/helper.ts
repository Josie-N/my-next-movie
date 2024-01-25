type ExtractNumbersResult = {
  currentBookmarkNumber: number,
  lastReturnedBookmarkNumber: number
}

export const extractNumberFromBookmarkId = (bookmarkId: string | undefined) : number => {
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

// (bookmarkId: string) => boolean is the type declaration in TS
export const doesBookmarkIdHaveValidFormat: (bookmarkId: string) => boolean = (bookmarkId: string) => {
  // Check if contains hyphen separated letters from a to z, with one number at the end
  const validFormat = /^[-a-zA-Z]+-[0-9]+$/;
  return validFormat.test(bookmarkId);
}

export const extractBookmarkIdNumbers = (id: string, lastReturnedBookmarkId: string) : ExtractNumbersResult => {
  const currentBookmarkNumber = extractNumberFromBookmarkId(id);
  const lastReturnedBookmarkNumber = extractNumberFromBookmarkId(lastReturnedBookmarkId);
  return { currentBookmarkNumber, lastReturnedBookmarkNumber };
};

export const isCurrentBookmarkSmallerThanLastBookmark = (currentBookmarkNumber : number, lastReturnedBookmarkNumber: number) : boolean => {
  return currentBookmarkNumber <= lastReturnedBookmarkNumber;
}
