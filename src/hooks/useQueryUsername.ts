import { useQuery } from "react-query";

import { useUsernameStore } from "../store/store";
import { getAPI } from "../services/utils/helper";
import { getUsername } from "../services/config";

export default function useQueryUsername () {
  const { username } = useUsernameStore();

  const { data } = useQuery(
    'username',
    () => getAPI(getUsername(username)),
    {
      staleTime: 10 * (60 * 1000), // 10 mins
      cacheTime: 15 * (60 * 1000), // 15 mins 
    }
  );

  return data?.data;
}
