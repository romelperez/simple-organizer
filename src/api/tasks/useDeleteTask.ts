import { MutationAction, useMutation } from '@app/tools/useMutation';
import { SelectBoardWithTasksData, getSelectBoardWithTasksKey } from '@app/api/boards/useSelectBoardWithTasks';

interface Request {
  boardId: string
  taskId: string
}

interface Variables {
  taskId: string
}

const useDeleteTask = (): MutationAction<Request> => {
  return useMutation<Request, Variables>(({ boardId, taskId }) => ({
    keys: [
      {
        key: getSelectBoardWithTasksKey(boardId),
        optimisticData: (data?: SelectBoardWithTasksData): SelectBoardWithTasksData | undefined => {
          if (data) {
            const newTasks = data.boards_by_pk.tasks.filter(task => task.id !== taskId);
            const newBoard = { ...data.boards_by_pk, tasks: newTasks };
            return { boards_by_pk: newBoard };
          }
        }
      }
    ],
    variables: { taskId },
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

export { useDeleteTask };
