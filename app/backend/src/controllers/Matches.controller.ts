import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchesService from '../services/Matches.service';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  public async getAllMatches(req: Request, res: Response) {
    const serviceResponse = await this.matchesService.getAllMatches(req);

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async endMatch(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.matchesService.endMatch(Number(id));

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const dataToUpdate = req.body;
    const serviceResponse = await this.matchesService.updateMatch(Number(id), dataToUpdate);

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async createMatch(req: Request, res: Response) {
    const dataToCreate = req.body;
    const serviceResponse = await this.matchesService.createMatch(dataToCreate);

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
