import { NextFunction, Request, Response } from 'express';
import logger from '../../packages/logger';

export const handleUnhandledError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.log('Unexpected error. Sending 500 response', err);
  return res.sendStatus(500);
};
