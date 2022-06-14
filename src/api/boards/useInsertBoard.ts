import { DataBoard_WithTasks } from '@app/types';
import { MutationResponse, MutationAction, useMutation } from '@app/tools/useMutation';
import { getSelectBoardsWithDetailsKey } from '../boards/useSelectBoardsWithDetails';

interface RequestData {
  input: {
    name: string
  }
}

interface ResponseData {
  insert_boards_one: DataBoard_WithTasks
}

type InsertBoardResponse = MutationResponse<ResponseData>;

const useInsertBoard = (): MutationAction<RequestData, ResponseData> => {
  return useMutation<RequestData, undefined, ResponseData>(() => ({
    keys: [
      getSelectBoardsWithDetailsKey()
    ],
    mutation: `
      mutation createBoard($input: boards_insert_input!) {
        insert_boards_one(object: $input) {
          id,
          name,
          createdAt,
          updatedAt,
          tasks {
            id,
            boardId,
            name,
            isCompleted,
            createdAt,
            updatedAt
          }
        }
      }
    `
  }));
};

export type { InsertBoardResponse };
export { useInsertBoard };
