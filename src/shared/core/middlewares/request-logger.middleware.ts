import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestLoggerMiddleware.name);
  private readonly excludedRoutes: string[] = [];

  use(req: Request, res: Response, next: NextFunction) {
    const startTimestamp = Date.now();

    res.on('finish', () => {
      const { method, url } = req;
      const statusCode = res.statusCode;
      const duration = Date.now() - startTimestamp;

      const logMessage = `[${new Date()}] - {${url}, ${method}} - ${statusCode} - ${duration}ms`;

      if (res.statusCode >= 400) {
        this.logger.error(logMessage);
      }
    });

    next();
  }

  private shouldLogRoute(url: string): boolean {
    return !this.excludedRoutes.some((route) => url.startsWith(route));
  }

  private shouldLogStatusCode(statusCode: number): boolean {
    return [500].includes(statusCode);
  }
}
