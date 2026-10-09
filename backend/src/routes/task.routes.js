import { Router } from 'express';
import {
  addTask,
  editTask,
  listTasks,
  readTask,
  removeTask,
} from '../controllers/task.controller.js';

const router = Router();

router.get('/', listTasks);
router.get('/:id', readTask);
router.post('/', addTask);
router.put('/:id', editTask);
router.delete('/:id', removeTask);

export default router;