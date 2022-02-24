import { Users } from '../../../database/init-model';

export interface IUserContext {
  userValidation(user: Users | null): Promise<Users | string>;
}
