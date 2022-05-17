import { useCallback } from 'react';
import { useSWRConfig } from 'swr';
import { useNhostClient } from '@nhost/react';

interface MutationResponse<ResponseData> {
  data?: ResponseData
  error?: Error
}

type MutationAction<RequestData, ResponseData> = (data: RequestData) => Promise<MutationResponse<ResponseData>>;

const useMutation = <RequestData, ResponseData>(
  key: string | Array<string | number>,
  mutation: string
): MutationAction<RequestData, ResponseData> => {
  const nhost = useNhostClient();
  const { mutate } = useSWRConfig();

  const call = useCallback(async (variables: RequestData) => {
    const response = await nhost.graphql.request(mutation, variables);
    const { data, error: resError } = response;

    if (resError) {
      const message = Array.isArray(resError)
        ? (resError[0] as Error).message
        : (resError as Error).message;
      const err = new Error(message);
      return { error: err };
    }

    await mutate(key);

    return { data };
  }, []);

  return call;
};

export type { MutationResponse, MutationAction };
export { useMutation };
