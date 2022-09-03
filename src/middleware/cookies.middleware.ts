import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CookieCheckMW implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.jwt;
    try {
      if (!token) throw new Error('No token found in the cookies');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) throw new Error('Failed to Verify Token');
      next();
    } catch (e) {
      console.log(e);
      return res.status(403).json({ code: '#NoToken' });
    }
  }
}

@Injectable()
export class RemoveCookiesMW implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.cookie('jwt', 'nothing', { maxAge: 1 });
    next();
  }
}
