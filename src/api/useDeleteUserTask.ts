import { MutationAction, useMutation } from '@app/tools/useMutation';

interface RequestData {
  taskId: string
}

const useDeleteUserTask = (boardId: string): MutationAction<RequestData, undefined> => {
  return useMutation<RequestData, undefined>(() => ({
    keys: [
      ['boards', boardId]
    ],
    mutation: `
      mutation deleteTask ($taskId: uuid!) {
        delete_tasks_by_pk(id: $taskId) {
          id,
          name
        }
      }
    `
  }));
};

export { useDeleteUserTask };
