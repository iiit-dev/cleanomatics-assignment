import useSWR from 'swr';

import { useAppState } from '../providers/AppState.jsx';
import { APIs, fetcher, putter } from '../utils.js';

export function useTodoLists() {
  const { data = [], mutate } = useSWR({ url: APIs.TodoLists }, fetcher);
  const { currentList, setCurrentList } = useAppState();

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
    async deleteList(taskId) {
      const taskIndex = data.findIndex(task => task.id === taskId);
      const remainingTasks = data.filter(task => task.id !== taskId);

      await putter({ url: APIs.TodoListDelete, id: taskId });
      await mutate(remainingTasks, { revalidate: false });

      if (currentList === taskId) {
        const nextTask = remainingTasks[
          Math.min(Math.max(taskIndex, 0), remainingTasks.length - 1)
        ];
        setCurrentList(nextTask?.id ?? null);
      }
    },
  };
}
