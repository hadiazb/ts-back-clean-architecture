import { Service } from 'typedi';
import { NextFunction, Request, Response } from 'express';

import { AuthContext } from '../../domain/AuthContext';
import { IAuthValidator } from '../interface/IAuthValidator';
import { Users } from '../../../../database/init-model';

@Service()
export class AuthValidator implements IAuthValidator {
  constructor(private readonly authContext: AuthContext) {}
}
