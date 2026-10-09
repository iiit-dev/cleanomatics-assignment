import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from '../services/task.service.js';

export function listTasks(_req, res) {
  res.json(getTasks());
}

export function readTask(req, res) {
  const task = getTaskById(req.params.id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(task);
}

export function addTask(req, res) {
  const task = createTask(req.body ?? {});
  res.status(201).json(task);
}

export function editTask(req, res) {
  const task = updateTask(req.params.id, req.body ?? {});
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(task);
}

export function removeTask(req, res) {
  if (!deleteTask(req.params.id)) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json({ success: true });
}