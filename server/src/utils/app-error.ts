import { HTTP_STATUS, ERROR_CODES } from '../common/constants.js';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errorCode: string;
  public readonly isOperational: boolean;
  public readonly details?: unknown;

  constructor(
    message: string,
    statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    errorCode: string = ERROR_CODES.INTERNAL_SERVER_ERROR,
    isOperational: boolean = true,
    details?: unknown,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = isOperational;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string, details?: unknown): AppError {
    return new AppError(message, HTTP_STATUS.BAD_REQUEST, ERROR_CODES.BAD_REQUEST, true, details);
  }

  static notFound(message: string = 'Resource not found'): AppError {
    return new AppError(message, HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, true);
  }

  static unauthorized(message: string = 'Unauthorized'): AppError {
    return new AppError(message, HTTP_STATUS.UNAUTHORIZED, ERROR_CODES.UNAUTHORIZED, true);
  }

  static forbidden(message: string = 'Forbidden'): AppError {
    return new AppError(message, HTTP_STATUS.FORBIDDEN, ERROR_CODES.FORBIDDEN, true);
  }

  static conflict(message: string, details?: unknown): AppError {
    return new AppError(message, HTTP_STATUS.CONFLICT, ERROR_CODES.CONFLICT, true, details);
  }

  static internal(message: string = 'Internal Server Error'): AppError {
    return new AppError(
      message,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      ERROR_CODES.INTERNAL_SERVER_ERROR,
      false,
    );
  }
}
