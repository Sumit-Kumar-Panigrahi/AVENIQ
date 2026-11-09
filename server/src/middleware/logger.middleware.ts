import type { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger.js';

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();
  const { method, originalUrl } = req;
  const ip = req.ip || req.socket.remoteAddress || 'unknown';

  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    const level = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info';

    const logMessage = `${method} ${originalUrl} ${statusCode} - ${duration}ms [${ip}]`;

    if (level === 'error') {
      logger.error(logMessage);
    } else if (level === 'warn') {
      logger.warn(logMessage);
    } else {
      logger.info(logMessage);
    }
  });

  next();
}
