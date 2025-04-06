import { Router } from 'express';
import {
  registerUser,
  userLogin,
  userLogout,
} from '../controller/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middlewares.js';

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(userLogin);
router.route('/logout').post(verifyJWT, userLogout);

export default router;
