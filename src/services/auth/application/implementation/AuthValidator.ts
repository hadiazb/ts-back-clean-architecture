import { Service } from 'typedi';
import { NextFunction, Request, Response } from 'express';

import { AuthContext } from '../../domain/AuthContext';
import { IAuthValidator } from '../interface/IAuthValidator';

@Service()
export class AuthValidator implements IAuthValidator {
  constructor(private readonly authContext: AuthContext) {}
}
