// Using the adapter pattern: https://refactoring.guru/design-patterns/adapter
export const normalizeMovies = (movies) => {
  if (!movies) {
    return { data: [], pagination: { totalPages: 0 } }
  }

  return {
    data: movies.pages.flatMap((page) => page.data),
    pagination: {
      totalPages: movies.pages[movies.pages.length - 1].pagination.totalPages, // the last page has the most updated
                                                                               // totalPages value
    }
  }
}
