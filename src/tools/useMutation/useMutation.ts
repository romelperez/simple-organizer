import { useCallback } from 'react';
import { useSWRConfig } from 'swr';
import { useNhostClient } from '@nhost/react';

import { QueryKey } from '@app/tools/useQuery';

// TODO: Simplify types.

type MutationKey = QueryKey;

interface MutationKeyWithOptions {
  key: MutationKey
  revalidate?: boolean
  optimisticData: (data: any) => any
}

interface MutationResponse<ResponseData> {
  data?: ResponseData
  error?: Error
}

type MutationExecute<RequestData = undefined, RequestVariables = undefined> = (data: RequestData) => {
  keys: Array<MutationKey | MutationKeyWithOptions>
  variables?: RequestVariables
  mutation: string
};

type MutationAction<RequestData = undefined, ResponseData = undefined> = (data: RequestData) => Promise<MutationResponse<ResponseData>>;

const useMutation = <RequestData = undefined, RequestVariables = undefined, ResponseData = undefined>(
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

export type {
  MutationKey,
  MutationKeyWithOptions,
  MutationResponse,
  MutationExecute,
  MutationAction
};
export { useMutation };
