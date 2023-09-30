import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { IUsersModel } from '../Interfaces/Users/IUsersModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import UserModel from '../models/Users.Model';

export default class UserService {
  constructor(
    private userModel: IUsersModel = new UserModel(),
  ) {}

  public async login(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
    const invalidMessage = 'E-mail ou senha incorretos';
    const user = await this.userModel.findByEmail(email);

    if (!user) return { status: 'UNAUTHORIZED', data: { message: invalidMessage } };

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return { status: 'UNAUTHORIZED', data: { message: invalidMessage } };

    const token = jwt.sign({
      id: user.id,
      role: user.role,
    }, process.env.JWT_SECRET || 'padrao', {
      expiresIn: '7d',
    });

    return { status: 'SUCCESS', data: { token } };
  }
}
