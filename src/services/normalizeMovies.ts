// Using the adapter pattern: https://refactoring.guru/design-patterns/adapter

import { InfiniteData } from "react-query";
import { Movies } from "../types/Movies";

export const normalizeMovies = (movies: InfiniteData<Movies> | undefined) => {

  if (!movies) {
    return {
      data: [],
      pagination: {
        totalItems: 0,
      }
    }
  }

  return {
    data: movies.pages.flatMap((page) => page.data),
    pagination: {
      // pages[movies.pages.length - 1]  =>  the last 'pages' index has the most updated value
      totalItems: movies.pages[movies.pages.length - 1].pagination.totalItems,
    }
  }
}
