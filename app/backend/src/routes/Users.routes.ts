import { Request, Router, Response } from 'express';
import UserController from '../controllers/Users.controller';
import Validations from '../middlewares/ValidationLogin';
import TokenValidation from '../middlewares/ValidationToken';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  Validations.validateLogin,
  Validations.validateEmailAndPass,
  (req: Request, res: Response) => userController.login(req, res),
);

router.get(
  '/role',
  TokenValidation.validationToken,
  (req: Request, res: Response) => UserController.role(req, res),
);

export default router;
