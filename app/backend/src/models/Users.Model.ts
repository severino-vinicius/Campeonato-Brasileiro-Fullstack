import { IUsersModel } from '../Interfaces/Users/IUsersModel';
import IUser from '../Interfaces/Users/IUser';
import UsersModelSequelize from '../database/models/UsersModelSequelize';

export default class UserModel implements IUsersModel {
  private model = UsersModelSequelize;

  public async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({
      where: {
        email,
      },
    });

    if (!user) return null;
    const { id, username, role, password } = user;
    return { id, username, role, email, password };
  }
}
