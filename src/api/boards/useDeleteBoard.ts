import { MutationAction, useMutation } from '@app/tools/useMutation';
import { getSelectBoardsWithDetailsKey } from '@app/api/boards/useSelectBoardsWithDetails';

interface RequestData {
  boardId: string
}

const useDeleteBoard = (): MutationAction<RequestData> => {
  return useMutation<RequestData>(() => ({
    keys: [
      getSelectBoardsWithDetailsKey()
    ],
    mutation: `
      mutation deleteBoard ($boardId: uuid!) {
        delete_boards_by_pk(id: $boardId) {
          id,
          name
        }
      }
    `
  }));
};

export { useDeleteBoard };
