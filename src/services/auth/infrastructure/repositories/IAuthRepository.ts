import { Users } from '../../../../database/init-model';
import { IUserCreator } from '../../application/interface/IAuthCreator';

export interface IAuthRepository {
  register(body: IUserCreator): Promise<Users>;
}
