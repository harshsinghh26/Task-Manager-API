import { Router } from 'express';
import {
  createTask,
  getAllTask,
  getTaskById,
} from '../controller/task.controller.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';

const router = Router();

router.route('/createtask').post(verifyJWT, createTask);
router.route('/getalltask').get(getAllTask);
router.route('/gettaskbyid/:id').get(verifyJWT, getTaskById);

export default router;
