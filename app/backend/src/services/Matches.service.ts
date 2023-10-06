import { Request } from 'express';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import {
  IMatchesModel,
  dataToCreateType,
  dataToUpdateType } from '../Interfaces/Matches/IMatchesModel';
import IMatche from '../Interfaces/Matches/Matche';
import MatchesModel from '../models/Matches.Models';
import { IteamsModel } from '../Interfaces/Teams/ITeamsModel';
import TeamsModel from '../models/Teams.Model';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
    private teamModel: IteamsModel = new TeamsModel(),
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

  public async createMatch(dataToCreate: dataToCreateType):
  Promise<ServiceResponse<IMatche | null>> {
    const { homeTeamId, awayTeamId } = dataToCreate;

    const validateTeamHome = await this.teamModel.findById(Number(homeTeamId));
    const validateTeamAway = await this.teamModel.findById(Number(awayTeamId));

    if (!validateTeamHome || !validateTeamAway) {
      return { status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' } };
    }

    const createdMatch = await this.matchesModel.createMatch(dataToCreate);

    return { status: 'CREATED', data: createdMatch };
  }
}
