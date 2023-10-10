import { Request, Response, Router } from 'express';
import BoardController from '../controllers/Leaderboard.controller';

const boardController = new BoardController();

const router = Router();

router.get('/home', (req: Request, res: Response) => boardController.getAllBoard(req, res));

router.get('/away', (req: Request, res: Response) => boardController.getAllBoard(req, res));

export default router;
