import { useMutation, useQueryClient } from "react-query";
import { postAPI } from "../../../../services/utils/helper";
import { useStore } from "../../../../store/store";

export default function useUpdateList (url) {
  const username = useStore(state => state.username);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => postAPI(url(id, username)),
    onSuccess: () => {
      // Invalidates every query with a key that starts with `list-recommended`
      // Once invalidated, it auto re-fetches the recommended movie list with updated result
      return queryClient.invalidateQueries('list-recommended');
    },
  });
  return mutation;
}