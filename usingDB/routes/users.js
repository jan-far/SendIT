import { Router } from 'express';
import Right from '../controllers/users';
import { auth, validator } from '../middleware';

const router = Router();

router.post('/auth/signup', validator.userValidator, Right.User.create);
router.post('/auth/signin', Right.User.login);
router.get('/users', auth.userRole, Right.User.getUser);
router.get('/logout', Right.User.logout);

export default router;
