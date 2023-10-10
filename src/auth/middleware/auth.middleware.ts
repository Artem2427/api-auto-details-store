import { UserEntity } from '@app/user/entity/user.entity';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';

interface ExpressRequestInterface extends Request {
  user?: UserEntity;
  lang?: string;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor() {}

  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization || !req.cookies.refreshToken) {
      req.user = null;
      req.lang = req.headers['accept-language'] || 'en';

      next();
      return;
    }

    const tokenAccess = req.headers.authorization.split(' ')[1];
    try {
      // const userData = validateToken(
      //   tokenAccess,
      //   process.env.JWT_ACCESS_SECRET,
      // );

      // if (userData) {
      //   const user = await this.userService.findByEmail(userData.email);

      //   req.user = user;
      // } else {
      //   req.user = null;
      // }

      req.user = null;
      req.lang = req.headers['accept-language'] || 'en';
      next();
      return;
    } catch (error) {
      req.user = null;
      req.lang = req.headers['accept-language'] || 'en';
      next();
      return;
    }
  }
}
