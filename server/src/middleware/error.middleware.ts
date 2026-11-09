import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/app-error.js';
import { HTTP_STATUS, ERROR_CODES } from '../common/constants.js';
import { logger } from '../utils/logger.js';
import { env } from '../config/env.js';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  // Handle AppError (Known operational errors)
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      error: {
        code: err.errorCode,
        message: err.message,
        ...(err.details ? { details: err.details } : {}),
      },
    });
    return;
  }

  // Handle Zod Validation Errors
  if (err instanceof ZodError) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: 'error',
      error: {
        code: ERROR_CODES.VALIDATION_ERROR,
        message: 'Request payload validation failed',
        details: err.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      },
    });
    return;
  }

  // Handle JSON Syntax Error in request body
  if (
    err instanceof SyntaxError &&
    'status' in err &&
    (err as { status: unknown }).status === 400
  ) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: 'error',
      error: {
        code: ERROR_CODES.BAD_REQUEST,
        message: 'Malformed JSON payload provided in request body',
      },
    });
    return;
  }

  // Unhandled / Internal Server Error
  logger.error('Unhandled Server Exception:', {
    message: err.message,
    stack: err.stack,
  });

  const isDev = env.NODE_ENV === 'development';
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    error: {
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: isDev ? err.message : 'An unexpected internal error occurred',
      ...(isDev && err.stack ? { stack: err.stack } : {}),
    },
  });
}
