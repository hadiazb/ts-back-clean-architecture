import { Request, Response, NextFunction, ErrorRequestHandler, Errback } from 'express';
import { Boom } from '@hapi/boom';

export class ErrorsHandler {
  public logErrors(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    next(err);
  }

  public errorHandler(err: Errback, req: Request, res: Response, next: NextFunction) {
    res.status(500).json({
      message: err.name
    });
  }

  public boomErrorHandler(err: Boom, req: Request, res: Response, next: NextFunction) {
    if (err.isBoom) {
      const { output } = err;
      res.status(output.statusCode).json(output.payload);
    }
    next(err);
  }
}
