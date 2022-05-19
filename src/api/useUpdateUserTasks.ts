import { MutationResponse, MutationAction, useMutation } from '@app/tools/useMutation';

interface RequestData {
  boardId: string
  tasksIds: string[]
  values: {
    isCompleted?: boolean
    updatedAt: string
  }
}

interface RequestVariables {
  where: {
    _or: Array<{ id: { _eq: string } }>
  }
  values: {
    isCompleted?: boolean
    updatedAt: string
  }
}

interface ResponseData {
  update_tasks: {
    affected_rows: number
  }
}

type UpdateUserTasksResponse = MutationResponse<ResponseData>;

const useUpdateUserTasks = (): MutationAction<RequestData, ResponseData> => {
  return useMutation<RequestData, ResponseData, RequestVariables>(data => ({
    keys: [
      ['boards', data.boardId, 'with-tasks']
    ],
    mutation: `
      mutation updateTasks($where: tasks_bool_exp!, $values: tasks_set_input!) {
        update_tasks(where: $where, _set: $values) {
          affected_rows
        }
      }
    `,
    variables: {
      where: {
        _or: data.tasksIds.map(id => ({ id: { _eq: id } }))
      },
      values: data.values
    }
  }));
};

export type { UpdateUserTasksResponse };
export { useUpdateUserTasks };
