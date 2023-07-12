import {useQueryClient} from "react-query";


export function useInvalidateQueries() {
  const queryClient = useQueryClient();

  const invalidateQueries = (queryNames: string[]) => {
    queryNames.forEach((queryName) => {
      queryClient.invalidateQueries(queryName);
    });
  };

  return invalidateQueries;
}
