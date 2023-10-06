import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/Matches.controller';
import TokenValidation from '../middlewares/ValidationToken';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

router.patch(
  '/:id/finish',
  TokenValidation.validationToken,
  (req: Request, res: Response) => matchesController.endMatch(req, res),
);

router.patch(
  '/:id',
  TokenValidation.validationToken,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);

export default router;
