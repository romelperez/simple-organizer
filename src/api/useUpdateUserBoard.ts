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
  return useMutation<RequestData, RequestVariables, ResponseData>(data => ({
    keys: [
      {
        key: ['boards'],
        optimisticData: (boardsData: undefined | UserBoards): undefined | UserBoards => {
          if (boardsData) {
            const newBoards = boardsData.boards.map(board => {
              if (board.id === data.filter.id) {
                return { ...board, ...data.values };
              }
              return board;
            });
            return { boards: newBoards };
          }
        }
      },
      {
        key: ['boards', data.filter.id, 'with-tasks'],
        optimisticData: (boardWithTasksData?: UserBoardTasks): UserBoardTasks | undefined => {
          if (boardWithTasksData) {
            const newBoard = { ...boardWithTasksData.boards_by_pk, ...data.values };
            return { boards_by_pk: newBoard };
          }
        }
      }
    ],
    data: {
      ...data,
      values: {
        ...data.values,
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
