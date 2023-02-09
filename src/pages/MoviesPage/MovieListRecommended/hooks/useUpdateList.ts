import { useMutation, useQueryClient } from "react-query";
import { postAPI } from "../../../../services/utils/helper";
import { useUsernameStore } from "../../../../store/store";


export default function useUpdateList(url: (id: string, username: string) => string) {
  const queryClient = useQueryClient();
  const { username } = useUsernameStore();

  const mutation = useMutation({
    mutationFn: (id: string) => postAPI(url(id, username)),
    onSuccess: () => {
      queryClient.invalidateQueries('username');
      // Invalidates every query with a key that starts with `list-${name}`
      // Once invalidated, it auto re-fetches `list-${name}` with the updated result
      queryClient.invalidateQueries('list-added');
      queryClient.invalidateQueries('list-rejected');
      return queryClient.invalidateQueries('list-recommended');
    },
  });
  return mutation;
}
