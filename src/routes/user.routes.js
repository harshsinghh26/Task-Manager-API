import { Router } from 'express';
import {
  registerUser,
  userLogin,
  userLogout,
} from '../controller/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';
import { createTask, getAllTask } from '../controller/task.controller.js';

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(userLogin);
router.route('/logout').post(verifyJWT, userLogout);
router.route('/task').post(verifyJWT, createTask);
router.route('/getalltask').get(getAllTask);

export default router;
