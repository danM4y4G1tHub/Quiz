import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { ApiTokenPaymentException } from '../exceptions/api-token-payment.exception';

export class ApiTokenCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['api-token'] !== 'my-token') {
      throw new ApiTokenPaymentException();
    }
    next();
  }
}
