// import { ICRUDModelReader } from '../ICRUDModel';
import IUser from './IUser';

export type IUsersModel = {
  findByEmail(email: string): Promise<IUser | null>
};
