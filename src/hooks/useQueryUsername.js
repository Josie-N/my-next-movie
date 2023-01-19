import { useQuery } from "react-query";

import { useUsernameStore } from "../store/store";
import { getAPI } from "../services/utils/helper";
import { getUsername } from "../services/config";

export default function useQueryUsername () {
  const { username } = useUsernameStore();

  const { data } = useQuery(
    'username',
    () => getAPI(getUsername(username))
  );

  return data?.data;
}
