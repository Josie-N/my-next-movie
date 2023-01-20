// Using the adapter pattern: https://refactoring.guru/design-patterns/adapter
export const normalizeMovies = (movies) => {
  if (!movies) {
    return {
      data: [],
      pagination: {
        totalItems: 0,
        totalPages: 0
      }
    }
  }
  
  return {
    data: movies.pages.flatMap((page) => page.data),
    pagination: {
      totalItems: movies.pages[movies.pages.length - 1].pagination.totalItems,
      totalPages: movies.pages[movies.pages.length - 1].pagination.totalPages,
      // pages[movies.pages.length - 1]  =>  the last 'pages' index has the most updated value
    }
  }
}
