import { Router } from 'express';
import Right from '../controllers/admin';
import { auth, validator } from '../middleware';

const router = Router();

// Admin signIn
router.post('/admin/signup', validator.userValidator, Right.create);

// Admin signUp
router.post('/admin/signin', Right.login);

// Authenticate admin
router.get('/admin/authenticate', auth.adminRole, Right.authenticate);

// Get all users
router.get('/admin/users', auth.adminRole, Right.getUsers);

// Get a user
router.get('/admin/user/:id', auth.adminRole, Right.getUser);

// Get All user parcels
router.get('/admin/parcels', auth.adminRole, Right.getAllParcel);

// Get a specific parcel by owners id
router.get('/admin/parcels/:id', auth.adminRole, Right.getParcelByOwner);

// Get a specific parcel by id
router.get('/admin/parcel/:id', auth.adminRole, Right.getParcelById);

export default router;
