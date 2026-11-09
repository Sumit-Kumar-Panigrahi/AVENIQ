import type { Request, Response, NextFunction } from 'express';
import { env } from '../../config/env.js';
import { checkDatabaseConnection } from '../../config/database.js';
import { APP_NAME, APP_VERSION, HTTP_STATUS } from '../../common/constants.js';
import type { ApiResponse, HealthCheckData } from '../../types/index.js';

export async function getHealth(
  _req: Request,
  res: Response<ApiResponse<HealthCheckData>>,
  next: NextFunction,
): Promise<void> {
  try {
    const dbCheck = await checkDatabaseConnection();

    const healthData: HealthCheckData = {
      status: 'ok',
      service: APP_NAME,
      version: APP_VERSION,
      environment: env.NODE_ENV,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: {
        status: dbCheck.connected ? 'connected' : 'pending_configuration',
        provider: 'postgresql',
      },
    };

    res.status(HTTP_STATUS.OK).json({
      status: 'success',
      data: healthData,
    });
  } catch (error) {
    next(error);
  }
}
