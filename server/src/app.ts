import express, { type Express } from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { requestLogger } from './middleware/logger.middleware.js';
import { errorHandler } from './middleware/error.middleware.js';
import { notFoundHandler } from './middleware/not-found.middleware.js';
import { healthRouter } from './modules/health/health.routes.js';

export function createApp(): Express {
  const app = express();

  // 1. Security & CORS configuration
  const allowedOrigins = env.CORS_ORIGIN.split(',').map((origin) => origin.trim());
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g., mobile apps, curl, server-to-server)
        if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`Origin ${origin} not allowed by CORS`));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    }),
  );

  // 2. Request body parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // 3. Request Logging
  app.use(requestLogger);

  // 4. API Routes
  const apiRouter = express.Router();

  // Mount module routes on API router
  apiRouter.use('/health', healthRouter);

  // Future modules will mount here:
  // apiRouter.use('/auth', authRouter);
  // apiRouter.use('/tickets', ticketsRouter);
  // apiRouter.use('/incidents', incidentsRouter);

  app.use(env.API_PREFIX, apiRouter);

  // Root redirect/status helper
  app.get('/', (_req, res) => {
    res.json({
      name: 'Aveniq API',
      status: 'active',
      docs: `${env.API_PREFIX}/health`,
    });
  });

  // 5. 404 Not Found Handling
  app.use(notFoundHandler);

  // 6. Centralized Error Handling
  app.use(errorHandler);

  return app;
}

export const app = createApp();
