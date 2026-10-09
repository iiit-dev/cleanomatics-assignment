import useSWR from 'swr';

import { APIs, fetcher, putter } from '../utils.js';

export function useTodoLists() {
  const { data = [], mutate } = useSWR({ url: APIs.TodoLists }, fetcher);

  return {
    data,
    async newList(newListName, icon) {
      const trimmedTitle = (newListName ?? '').trim() || 'Untitled task';

      return await mutate(
        await putter({
          url: APIs.TodoLists,
          title: trimmedTitle,
          icon,
          description: '',
          status: 'pending',
          priority: 'medium',
          dueDate: null,
        }),
        {
          populateCache: false,
          optimisticData: oldData => [
            ...oldData,
            {
              id: Date.now(),
              title: trimmedTitle,
              icon: icon || 'TaskAlt',
              description: '',
              status: 'pending',
              priority: 'medium',
              dueDate: null,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        }
      );
    },
    async updateList(taskId, taskUpdate) {
      const updatedTask = await putter({
        url: APIs.TodoListsUpdate,
        id: taskId,
        ...taskUpdate,
      });

      await mutate(
        updatedTask,
        {
          populateCache: false,
          optimisticData: oldData =>
            oldData.map(task => {
              if (task.id === taskId) {
                return { ...task, ...taskUpdate, updatedAt: new Date().toISOString() };
              }
              return task;
            }),
        }
      );

      return updatedTask;
    },
  };
}
