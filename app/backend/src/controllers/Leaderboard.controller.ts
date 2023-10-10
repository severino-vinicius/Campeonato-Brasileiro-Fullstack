import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import BoardService from '../services/Leaderboard.service';

export default class BoardController {
  constructor(
    private boardService = new BoardService(),
  ) {}

  public async getAllBoard(req: Request, res: Response) {
    const serviceResponse = await this.boardService.getAllBoard();

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
