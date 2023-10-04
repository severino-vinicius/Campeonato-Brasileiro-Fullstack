import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import IMatche from '../Interfaces/Matches/Matche';
import MatchesModel from '../models/Matches.Models';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) {}

  public async getAllMatches(): Promise<ServiceResponse<IMatche[]>> {
    const allMatches = await this.matchesModel.findAll();
    return {
      status: 'SUCCESS',
      data: allMatches,
    };
  }
}
