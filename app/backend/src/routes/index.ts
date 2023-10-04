import { Router } from 'express';
import teamsRouter from './Teams.routes';
import userRouter from './Users.routes';
import matchesRouter from './Matches.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', userRouter);
router.use('/matches', matchesRouter);

export default router;
