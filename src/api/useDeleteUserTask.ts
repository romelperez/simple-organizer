import { MutationAction, useMutation } from '@app/tools/useMutation';

interface RequestData {
  boardId: string
  taskId: string
}

interface RequestVariables {
  taskId: string
}

const useDeleteUserTask = (): MutationAction<RequestData, undefined> => {
  return useMutation<RequestData, undefined, RequestVariables>(({ boardId, taskId }) => ({
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
    `,
    variables: { taskId }
  }));
};

export { useDeleteUserTask };
