import { Router } from 'express';
import Right from '../controllers/users';
import validator from '../middleware/verifyBody';

const router = Router();

router.post('/auth/signup', validator.userValidator, Right.User.create);
router.post('/auth/signin', Right.User.login);

router.post('/admin/signup', validator.userValidator, Right.Admin.create);

export default router;
