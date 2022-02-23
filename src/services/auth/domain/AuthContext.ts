import { Service } from 'typedi';
import { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';
import Joi from 'joi';

import { IAuthContext } from './IAuthContext';
import { Users } from './models/Users';

@Service()
export class AuthContext implements IAuthContext {}
