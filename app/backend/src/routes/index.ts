import { Router } from 'express';
import teamsRouter from './Teams.routes';
import userRouter from './Users.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', userRouter);

export default router;
