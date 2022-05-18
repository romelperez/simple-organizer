import { DataBoard } from '@app/types';
import { MutationResponse, MutationAction, useMutation } from './useMutation';

interface RequestData {
  filter: {
    id: string
  }
  values: {
    name: string
    updatedAt: string
  }
}

interface ResponseData {
  update_boards_by_pk: DataBoard
}

type UpdateUserBoardResponse = MutationResponse<ResponseData>;

const useUpdateUserBoard = (): MutationAction<RequestData, ResponseData> => {
  return useMutation<RequestData, ResponseData>(variables => ({
    keys: [
      ['boards'],
      ['boards', variables.filter.id]
    ],
    mutation: `
      mutation updateBoard ($filter: boards_pk_columns_input!, $values: boards_set_input!) {
        update_boards_by_pk(pk_columns: $filter, _set: $values) {
          id,
          name,
          createdAt,
          updatedAt
        }
      }
    `
  }));
};

export type { UpdateUserBoardResponse };
export { useUpdateUserBoard };
