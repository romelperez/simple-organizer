import { useCallback } from 'react';
import { useSWRConfig } from 'swr';
import { useNhostClient } from '@nhost/react';

type MutationKey = Array<string | number>;

interface MutationResponse<ResponseData> {
  data?: ResponseData
  error?: Error
}

interface MutationKeyOptimisticUpdate {
  key: MutationKey
  revalidate?: boolean
  optimisticData: (data: any) => any
}

type MutationExecute<RequestData, RequestVariables = undefined> = (variables: RequestData) => {
  keys: Array<MutationKey | MutationKeyOptimisticUpdate>
  mutation: string
  variables?: RequestVariables
};

type MutationAction<RequestData, ResponseData> = (data: RequestData) => Promise<MutationResponse<ResponseData>>;

const useMutation = <RequestData = undefined, ResponseData = undefined, RequestVariables = undefined>(
  execute: MutationExecute<RequestData, RequestVariables>
): MutationAction<RequestData, ResponseData> => {
  const nhost = useNhostClient();
  const swr = useSWRConfig();

  const mutate = useCallback(async (userVariables: RequestData) => {
    const { keys, mutation, variables = userVariables } = await execute(userVariables);

    const response = await nhost.graphql.request(mutation, variables);
    const { data, error: resError } = response;

    if (resError) {
      const message = Array.isArray(resError)
        ? (resError[0] as Error).message
        : (resError as Error).message;
      const err = new Error(message);
      return { error: err };
    }

    for (const keyItem of keys) {
      if (Array.isArray(keyItem)) {
        await swr.mutate(keyItem);
      } else {
        const { key, optimisticData, revalidate = false } = keyItem;
        await swr.mutate(key, optimisticData, {
          rollbackOnError: true,
          revalidate: revalidate
        });
      }
    }

    return { data };
  }, []);

  return mutate;
};

export type { MutationResponse, MutationExecute, MutationAction };
export { useMutation };
