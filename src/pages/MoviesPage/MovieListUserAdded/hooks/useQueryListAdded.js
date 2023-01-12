import { useInfiniteQuery } from "react-query";
import { useStore } from "../../../../store/store";

import { getAPI } from "../../../../services/utils/helper";
import { getAddedMovieList } from "../../../../services/movieList";
import { normalizeMovies } from "../../../../services/normalizeMovies";

export default function useQueryListAdded () {
  const username = useStore(state => state.username);
  
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    'list-added',
    ({ pageParam = 1 }) => getAPI(getAddedMovieList(pageParam, username)),
    {
      getNextPageParam: (lastPage) => (lastPage.pagination.next.page || undefined),
      useErrorBoundary: true,
    }
  );

  const movies = normalizeMovies(data);

  return { movies, isLoading, fetchNextPage, hasNextPage };
}