import { Request, Router, Response } from 'express';
import TeamsController from '../controllers/Teams.controller';

const teamController = new TeamsController();

const router = Router();

router.get('/', (req: Request, res: Response) => teamController.getAllTeams(req, res));

export default router;
