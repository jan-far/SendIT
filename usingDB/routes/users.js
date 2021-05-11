import { Router } from 'express';
import Right from '../controllers/users';
import { auth, validator } from '../middleware';

const router = Router();
// signup/register new user
router.post('/auth/signup', validator.userValidator, Right.User.create);

// Login/signin registered user
router.post('/auth/signin', Right.User.login);

// Get a user data
router.get('/users', auth.userRole, Right.User.getUser);

// authenticate user
router.get('/user/authenticate', auth.userRole, Right.User.authenticate);

export default router;
