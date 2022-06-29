import useSWR, { SWRResponse } from 'swr';
import { useNhostClient } from '@nhost/react';

// TODO: Simplify types.

type QueryKey = Array<string | number>;
type QueryResponse<R, E = Error> = SWRResponse<R, E>;

const useQuery = <QueryData>(
  key: QueryKey,
  query: string,
  variables?: Record<string, unknown>
): QueryResponse<QueryData> => {
  const nhost = useNhostClient();

  return useSWR<QueryData>(key, async () => {
    const response = await nhost.graphql.request<QueryData>(query, variables);

    const { data, error } = response;

    if (Array.isArray(error)) {
      throw new Error((error[0] as Error).message);
    } else if (error) {
      throw new Error((error as Error).message);
    }

    return data;
  });
};

export type { QueryKey, QueryResponse };
export { useQuery };
