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

const useDeleteTasks = (): MutationAction<RequestData> => {
  return useMutation<RequestData, RequestVariables>(({ boardId, tasksIds }) => ({
    keys: [
      ['boards', boardId, 'with-tasks']
    ],
    variables: {
      where: {
        _or: tasksIds.map(id => ({ id: { _eq: id } }))
      }
    },
    mutation: `
      mutation deleteTasks($where: tasks_bool_exp!) {
        delete_tasks(where: $where) {
          affected_rows
        }
      }
    `
  }));
};

export { useDeleteTasks };
