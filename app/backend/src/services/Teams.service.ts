import { ServiceResponse } from '../Interfaces/ServiceResponse';
import Iteams from '../Interfaces/Teams/Teams';
import { IteamsModel } from '../Interfaces/Teams/ITeamsModel';
import TeamsModel from '../models/Teams.Model';

export default class TeamsService {
  constructor(
    private teamsModel: IteamsModel = new TeamsModel(),
  ) {}

  public async getAllTeams(): Promise<ServiceResponse<Iteams[]>> {
    const allTeams = await this.teamsModel.findAll();
    return {
      status: 'SUCCESS',
      data: allTeams,
    };
  }
}
