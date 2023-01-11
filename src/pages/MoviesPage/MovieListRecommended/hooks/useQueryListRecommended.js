import { useInfiniteQuery } from "react-query";
import { getAPI } from "../../../../services/utils/helper";
import { normalizeMovies } from "../../../../services/normalizeMovies";
import { getRecommendedMovieList } from "../../../../services/movieList";
import { useStore } from "../../../../store/store";

export default function useQueryListRecommended () {
  const username = useStore(state => state.username);

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    'list-recommended',
    ({ pageParam = 1 }) => getAPI(getRecommendedMovieList(pageParam, username)),
    {
      getNextPageParam: (lastPage) => (lastPage.pagination.next.page || undefined),
      useErrorBoundary: true,
    }
  );

  const movies = normalizeMovies(data);

  return { movies, isLoading, fetchNextPage, hasNextPage };
}