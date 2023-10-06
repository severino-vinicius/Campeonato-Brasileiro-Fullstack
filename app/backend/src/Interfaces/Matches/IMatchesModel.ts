// import { ICRUDModelReader } from '../ICRUDModel';
import IMatche from './Matche';

export type dataToUpdateType = {
  homeTeamGoals: number,
  awayTeamGoals: number
};

export type dataToCreateType = {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number
};

export type IMatchesModel = {
  findAll(): Promise<IMatche[]>
  findById(id: number): Promise<IMatche | null>
  findMatchByProgress(inProgress: boolean): Promise<IMatche[] | null>
  endMatch(id:number): Promise<IMatche | null>
  updateMatch(id:number, dataToUpdate: dataToUpdateType): Promise<IMatche | null>
  createMatch(dataToCreate: dataToCreateType): Promise<IMatche | null>
};
