import { Request, Response } from 'express';
import TeamsService from '../services/Teams.service';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) {}

  public async getAllTeams(req: Request, res: Response) {
    const serviceResponse = await this.teamsService.getAllTeams();
    res.status(200).json(serviceResponse.data);
  }
}
