import { Request } from 'express';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchesModel, dataToUpdateType } from '../Interfaces/Matches/IMatchesModel';
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

    await this.matchesModel.endMatch(id);

    return { status: 'SUCCESS', data: { message: 'Finished' } };
  }

  public async updateMatch(id: number, dataToUpdate: dataToUpdateType):
  Promise<ServiceResponse<IMatche | null>> {
    const foundMatche = await this.matchesModel.findById(id);
    if (!foundMatche) return { status: 'NOT_FOUND', data: { message: `Matche ${id} not found` } };

    const updatedMatch = await this.matchesModel.updateMatch(id, dataToUpdate);

    return { status: 'SUCCESS', data: updatedMatch };
  }
}
