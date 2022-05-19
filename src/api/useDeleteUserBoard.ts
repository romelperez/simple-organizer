import { MutationAction, useMutation } from '@app/tools/useMutation';

interface RequestData {
  boardId: string
}

const useDeleteUserBoard = (): MutationAction<RequestData> => {
  return useMutation<RequestData>(() => ({
    keys: [
      ['boards']
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

export { useDeleteUserBoard };
