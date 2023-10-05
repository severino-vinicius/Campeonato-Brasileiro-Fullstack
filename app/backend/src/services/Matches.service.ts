import { Request } from 'express';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
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
}
