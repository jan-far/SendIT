import Users from '../controller/userController';
import auth from '../middleware/auth';

const router = require('express').Router();

router.get('/users', auth.verifyToken, Users.getUser);
router.post('/auth/signup', auth.ValidateRegisterBody, Users.create);
router.post('/auth/signin', Users.login);

export default router;
