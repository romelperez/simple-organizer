import { DataBoard } from '@app/types';
import { MutationResponse, MutationAction, useMutation } from '@app/tools/useMutation';
import { SelectBoardsWithDetailsData, getSelectBoardsWithDetailsKey } from '@app/api/boards/useSelectBoardsWithDetails';
import { SelectBoardWithTasksData, getSelectBoardWithTasksKey } from '@app/api/boards/useSelectBoardWithTasks';

interface Request {
  filter: {
    id: string
  }
  values: {
    name: string
  }
}

interface Variables {
  filter: {
    id: string
  }
  values: {
    name: string
    updatedAt: string
  }
}

interface Result {
  update_boards_by_pk: DataBoard
}

type UpdateBoardResponse = MutationResponse<Result>;

const useUpdateBoard = (): MutationAction<Request, Result> => {
  return useMutation<Request, Variables, Result>(data => ({
    keys: [
      {
        key: getSelectBoardsWithDetailsKey(),
        optimisticData: (boardsData?: SelectBoardsWithDetailsData): SelectBoardsWithDetailsData | undefined => {
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
        key: getSelectBoardWithTasksKey(data.filter.id),
        optimisticData: (boardWithTasksData?: SelectBoardWithTasksData): SelectBoardWithTasksData | undefined => {
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

export type { UpdateBoardResponse };
export { useUpdateBoard };
