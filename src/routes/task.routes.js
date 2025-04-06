import { Router } from 'express';
import {
  createTask,
  deleteTask,
  getAllTask,
  getTaskById,
  updateTask,
} from '../controller/task.controller.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';

const router = Router();

router.route('/createtask').post(verifyJWT, createTask);
router.route('/getalltask').get(getAllTask);
router.route('/gettaskbyid/:id').get(verifyJWT, getTaskById);
router.route('/update/:id').put(verifyJWT, updateTask);
router.route('/delete/:id').put(verifyJWT, deleteTask);

export default router;
