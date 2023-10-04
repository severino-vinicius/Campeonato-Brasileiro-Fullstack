// import { ICRUDModelReader } from '../ICRUDModel';
import IMatche from './Matche';

export type IMatchesModel = {
  findAll(): Promise<IMatche[]>
};
