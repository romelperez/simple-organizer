import { MutationAction, useMutation } from '@app/tools/useMutation';

interface RequestData {
  boardId: string
  tasksIds: string[]
}

interface RequestVariables {
  where: {
    _or: Array<{ id: { _eq: string } }>
  }
}

const useDeleteUserTasks = (): MutationAction<RequestData, undefined> => {
  return useMutation<RequestData, undefined, RequestVariables>(({ boardId, tasksIds }) => ({
    keys: [
      ['boards', boardId]
    ],
    mutation: `
      mutation deleteTasks($where: tasks_bool_exp!) {
        delete_tasks(where: $where) {
          affected_rows
        }
      }
    `,
    variables: {
      where: {
        _or: tasksIds.map(id => ({ id: { _eq: id } }))
      }
    }
  }));
};

export { useDeleteUserTasks };
