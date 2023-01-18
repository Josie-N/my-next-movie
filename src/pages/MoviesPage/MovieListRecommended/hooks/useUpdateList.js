import { useMutation, useQueryClient } from "react-query";
import { postAPI } from "../../../../services/utils/helper";
import { useUsernameStore } from "../../../../store/store";

export default function useUpdateList (url) {
  const queryClient = useQueryClient();
  const { username } = useUsernameStore();

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
