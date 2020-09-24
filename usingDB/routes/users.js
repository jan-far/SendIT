import { Router } from 'express';
import Right from '../controllers/users';
import { auth, validator, userSession } from '../middleware';

const router = Router();

router.post('/auth/signup', validator.userValidator, Right.User.create);
router.post('/auth/signin', Right.User.login);
router.get('/users', auth.userRole, Right.User.getUser);

router.post('/admin/signup', validator.userValidator, Right.Admin.create);

export default router;
