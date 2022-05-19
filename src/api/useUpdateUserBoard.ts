import { DataBoard } from '@app/types';
import { MutationResponse, MutationAction, useMutation } from '@app/tools/useMutation';
import { UserBoards } from './useUserBoards';
import { UserBoardTasks } from './useUserBoardTasks';

interface RequestData {
  filter: {
    id: string
  }
  values: {
    name: string
  }
}

interface RequestVariables {
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
  return useMutation<RequestData, ResponseData, RequestVariables>(variables => ({
    keys: [
      {
        key: ['boards'],
        optimisticData: (data: undefined | UserBoards): undefined | UserBoards => {
          if (data) {
            const newBoards = data.boards.map(board => {
              if (board.id === variables.filter.id) {
                return { ...board, ...variables.values };
              }
              return board;
            });
            return { boards: newBoards };
          }
        }
      },
      {
        key: ['boards', variables.filter.id, 'with-tasks'],
        optimisticData: (data?: UserBoardTasks): UserBoardTasks | undefined => {
          if (data) {
            const newBoard = { ...data.boards_by_pk, ...variables.values };
            return { boards_by_pk: newBoard };
          }
        }
      }
    ],
    variables: {
      ...variables,
      values: {
        ...variables.values,
        updatedAt: new Date().toISOString()
      }
    },
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
