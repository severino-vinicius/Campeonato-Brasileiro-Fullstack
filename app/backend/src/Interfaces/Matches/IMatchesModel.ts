// import { ICRUDModelReader } from '../ICRUDModel';
import IMatche from './Matche';

export type IMatchesModel = {
  findAll(): Promise<IMatche[]>
  findById(id: number): Promise<IMatche | null>
  findMatchByProgress(inProgress: boolean): Promise<IMatche[] | null>
  endMatch(id:number): Promise<IMatche | null>
};
