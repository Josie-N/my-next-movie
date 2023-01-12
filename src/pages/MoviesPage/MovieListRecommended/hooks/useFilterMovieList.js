import { useMutation, useQueryClient } from "react-query";
import { postAPI } from "../../../../services/utils/helper";
import { useStore } from "../../../../store/store";
import { postToAddedMovieList } from "../../../../services/movieList";

export default function useFilterMovieList () {
  const username = useStore(state => state.username);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => postAPI(postToAddedMovieList(id, username)),
    onSuccess: () => {
      // Invalidates every query with a key that starts with `list-recommended`
      // Once invalidated, it auto-refetches the recommended movie list with updated result
      return queryClient.invalidateQueries('list-recommended');
    },
  })
  return mutation;
}