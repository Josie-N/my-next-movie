import { useInfiniteQuery } from "react-query";
import { useUsernameStore } from "../store/store";
import { getAPI } from "../services/utils/helper";
import { normalizeMovies } from "../services/normalizeMovies";

export default function useQueryList (movieListConfig) {
  const { username } = useUsernameStore();

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    movieListConfig.queryKey,
    ({ pageParam = 1 }) => getAPI(movieListConfig.getUrlFunction(pageParam, username)),
    {
      getNextPageParam: (lastPage) => (lastPage.pagination.next.page || undefined),
      useErrorBoundary: true,
    }
  );

  const movies = normalizeMovies(data);

  return { movies, isLoading, fetchNextPage, hasNextPage };
}
