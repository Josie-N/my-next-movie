import { useStore } from "../../../../store/store";
import { useInfiniteQuery } from "react-query";
import { getAPI } from "../../../../services/utils/helper";
import { getRemovedMovieList } from "../../../../services/movieList";
import { normalizeMovies } from "../../../../services/normalizeMovies";

export default function useQueryListRejected () {
  const username = useStore(state => state.username);

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    'list-rejected',
    ({ pageParam = 1 }) => getAPI(getRemovedMovieList(pageParam, username)),
    {
      getNextPageParam: (lastPage) => (lastPage.pagination.next.page || undefined),
      useErrorBoundary: true,
    }
  );

  const movies = normalizeMovies(data);

  return { movies, isLoading, fetchNextPage, hasNextPage };
}