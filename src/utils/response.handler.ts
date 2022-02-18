import { Request, Response } from 'express';
import { Service } from 'typedi';

@Service()
export class ApiResponse {
  public success(req: Request, res: Response, options: object) {
    res.send(options);
  }
}
