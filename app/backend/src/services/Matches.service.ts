import { Request } from 'express';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import IMatche from '../Interfaces/Matches/Matche';
import MatchesModel from '../models/Matches.Models';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) {}

  public async getAllMatches(req: Request): Promise<ServiceResponse<IMatche[] | null>> {
    const { inProgress } = req.query;
    const matchesProgress = inProgress === 'true';
    if (inProgress === undefined) {
      const allMatches = await this.matchesModel.findAll();
      return {
        status: 'SUCCESS', data: allMatches,
      };
    }
    const finishedMatches = await this.matchesModel.findMatchByProgress(matchesProgress);
    return {
      status: 'SUCCESS', data: finishedMatches,
    };
  }

  public async endMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    const foundMatche = await this.matchesModel.findById(id);
    if (!foundMatche) return { status: 'NOT_FOUND', data: { message: `Matche ${id} not found` } };

    const finishMatch = await this.matchesModel.endMatch(id);
    if (!finishMatch) {
      return { status: 'CONFLICT',
        data: { message: `This matche ${id} is already finished!` } };
    }
    return { status: 'SUCCESS', data: { message: 'Finished' } };
  }
}
