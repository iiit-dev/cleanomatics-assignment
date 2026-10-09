import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cleanomatics-assignment.vercel.app/api',
});

export const APIs = {
  TodoLists: 'todo-lists',
  TodoListsUpdate: 'todo-lists-update',
  TodoList: 'todo-list',
  TodoListDelete: 'todo-list-delete',
  TodoListUpdate: 'todo-list-update',
};

export async function fetcher({ url, ...variables }) {
  switch (url) {
    case APIs.TodoLists: {
      const { data } = await api.get('/tasks');
      return data;
    }
    case APIs.TodoList: {
      const { data } = await api.get(`/tasks/${variables.id}`);
      return data;
    }
    default:
      throw new Error(`Unknown API ${url}`);
  }
}

export async function putter({ url, id, ...variables }) {
  switch (url) {
    case APIs.TodoLists: {
      const { data } = await api.post('/tasks', {
        title: variables.title ?? variables.name,
        description: variables.description ?? '',
        status: variables.status ?? 'pending',
        priority: variables.priority ?? 'medium',
        dueDate: variables.dueDate ?? null,
      });
      return data;
    }
    case APIs.TodoListsUpdate: {
      const { data } = await api.put(`/tasks/${id}`, {
        title: variables.title ?? variables.name,
        description: variables.description,
        status: variables.status,
        priority: variables.priority,
        dueDate: variables.dueDate,
      });
      return data;
    }
    case APIs.TodoList: {
      const { data } = await api.post('/tasks', {
        title: variables.title ?? variables.name,
        description: variables.description ?? '',
        status: variables.status ?? 'pending',
        priority: variables.priority ?? 'medium',
        dueDate: variables.dueDate ?? null,
      });
      return data;
    }
    case APIs.TodoListDelete: {
      const { data } = await api.delete(`/tasks/${id}`);
      return data;
    }
    case APIs.TodoListUpdate: {
      const { data } = await api.put(`/tasks/${id}`, variables);
      return data;
    }
    default:
      throw new Error(`Unknown API ${url}`);
  }
}
