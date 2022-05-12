import useSWR, { SWRResponse } from 'swr';

import { useStore } from '@app/containers/Store';

type QueryResponse<R, E = Error> = SWRResponse<R, E>;

const useQuery = <QueryData>(key: string, query: string): QueryResponse<QueryData> => {
  const nhost = useStore(state => state.nhost);

  return useSWR<QueryData>(key, async () => {
    const response = await nhost.graphql.request<QueryData>(query);

    const { data, error } = response;

    if (Array.isArray(error)) {
      throw new Error((error[0] as Error).message);
    } else if (error) {
      throw new Error((error as Error).message);
    }

    return data;
  });
};

export type { QueryResponse };
export { useQuery };
