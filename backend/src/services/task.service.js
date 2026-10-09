let nextTaskId = 1;
const tasks = [];

const VALID_STATUSES = new Set(['pending', 'in_progress', 'completed']);
const VALID_PRIORITIES = new Set(['low', 'medium', 'high']);

function findTask(id) {
  return tasks.find(task => task.id === Number(id));
}

function normalizeTaskPayload(payload = {}) {
  const now = new Date().toISOString();
  const title = String(payload.title ?? 'Untitled task').trim() || 'Untitled task';
  const description = String(payload.description ?? '').trim();
  const status = VALID_STATUSES.has(payload.status) ? payload.status : 'pending';
  const priority = VALID_PRIORITIES.has(payload.priority) ? payload.priority : 'medium';
  const dueDate = payload.dueDate ? String(payload.dueDate) : null;

  return {
    id: nextTaskId++,
    title,
    description,
    status,
    priority,
    dueDate,
    createdAt: now,
    updatedAt: now,
  };
}

export function getTasks() {
  return tasks;
}

export function getTaskById(id) {
  return findTask(id);
}

export function createTask(payload) {
  const task = normalizeTaskPayload(payload);
  tasks.push(task);
  return task;
}

export function updateTask(id, payload = {}) {
  const task = findTask(id);
  if (!task) {
    return null;
  }

  if (payload.title !== undefined) {
    task.title = String(payload.title).trim() || task.title;
  }
  if (payload.description !== undefined) {
    task.description = String(payload.description).trim();
  }
  if (payload.status !== undefined) {
    task.status = VALID_STATUSES.has(payload.status) ? payload.status : task.status;
  }
  if (payload.priority !== undefined) {
    task.priority = VALID_PRIORITIES.has(payload.priority)
      ? payload.priority
      : task.priority;
  }
  if (payload.dueDate !== undefined) {
    task.dueDate = payload.dueDate ? String(payload.dueDate) : null;
  }

  task.updatedAt = new Date().toISOString();
  return task;
}

export function deleteTask(id) {
  const taskId = Number(id);
  const index = tasks.findIndex(task => task.id === taskId);
  if (index === -1) {
    return false;
  }

  tasks.splice(index, 1);
  return true;
}