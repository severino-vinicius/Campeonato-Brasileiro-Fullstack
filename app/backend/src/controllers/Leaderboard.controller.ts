import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import BoardService from '../services/Leaderboard.service';

export default class BoardController {
  constructor(
    private boardService = new BoardService(),
  ) {}

  public async getAllBoard(req: Request, res: Response) {
    const [,, path] = req.originalUrl.split('/');
    const serviceResponse = await this.boardService.getAllBoard(path);

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getAllLeaderboard(req: Request, res: Response) {
    const serviceResponse = await this.boardService.getAllLeaderboard();

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
