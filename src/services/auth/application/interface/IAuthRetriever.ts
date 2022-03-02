import { Users } from '../../../../database/init-model';
import { IUserCreator } from '../../../user/application/interface/IUserCreator';

export interface IAuthRetriever {
  register(body: IUserCreator): Promise<Users>;
}
