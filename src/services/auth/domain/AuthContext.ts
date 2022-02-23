import { Service } from 'typedi';

import { IAuthContext } from './IAuthContext';

@Service()
export class AuthContext implements IAuthContext {}
