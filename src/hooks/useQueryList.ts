import { useInfiniteQuery } from "react-query";
import { useUsernameStore } from "../store/store";
import { getAPI } from "../services/utils/helper";
import { normalizeMovies } from "../services/normalizeMovies";

type Props = {
  queryKey: string,
  listComponent: () => JSX.Element,
  getUrlFunction: (pageParam: string, username: string) => string
}

export default function useQueryList(movieListConfig: Props) {
  const { username } = useUsernameStore();

  const { data, isLoading, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(
    movieListConfig.queryKey,
    // pageParam is derived from the previous page via getNextPageParam
    // since the first page has no previous page, we assign it a default/initial value ('', 0)
    ({ pageParam = '' }) => getAPI(movieListConfig.getUrlFunction(pageParam, username)),
    {
      getNextPageParam: (lastPage) => lastPage.pagination?.next?.cursor,
      useErrorBoundary: true,
    }
  );

  const movies = normalizeMovies(data);

  return { movies, isLoading, isFetching, fetchNextPage, hasNextPage };
}
