import { Request, Router, Response } from 'express';
import UserController from '../controllers/Users.controller';
import Validations from '../middlewares/ValidationLogin';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  Validations.validateLogin,
  Validations.validateEmailAndPass,
  (req: Request, res: Response) => userController.login(req, res),
);

export default router;
