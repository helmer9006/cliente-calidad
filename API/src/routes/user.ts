import { checkRole } from './../middlewares/role';
import { checkJwt } from './../middlewares/jwt';
import { UserController } from './../controller/UserController';
import { Router } from 'express';

const router = Router();

// Get all users
router.get('/', UserController.getAll);

// Get one user
router.get('/:id', [checkJwt, checkRole(['dashboard'])], UserController.getById);

// Create a new user
router.post('/', [checkJwt, checkRole(['dashboard'])], UserController.new);

// Edit user
router.patch('/:id', [checkJwt, checkRole(['dashboard'])], UserController.edit);

// Delete
router.delete('/:id', [checkJwt, checkRole(['dashboard'])], UserController.delete);

export default router;
