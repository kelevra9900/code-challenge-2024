import cors from 'cors';
import express, { Express } from 'express';
import fileUpload from 'express-fileupload';
import helmet from 'helmet';
import path from 'path';
import { pino } from 'pino';

import { authRouter } from '@/api/auth/authRouter';
import { categoryRouter } from '@/api/category/categoryRouter';
import { contentRouter } from '@/api/content/contentRouter';
import { healthCheckRouter } from '@/api/healthCheck/healthCheckRouter';
import { themeRouter } from '@/api/theme/themeRouter';
import { uploadRouter } from '@/api/upload/uploadRouter';
import { userRouter } from '@/api/user/userRouter';
import { openAPIRouter } from '@/api-docs/openAPIRouter';
import errorHandler from '@/common/middleware/errorHandler';
import rateLimiter from '@/common/middleware/rateLimiter';
import requestLogger from '@/common/middleware/requestLogger';

// connectDB
import { connectDB } from './config/db';

const logger = pino({ name: 'server start' });
const app: Express = express();

// Connect to the database
connectDB();

// Set the application to trust the reverse proxy
app.set('trust proxy', true);
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(fileUpload({ createParentPath: true }));

// Middlewares
app.use(cors());
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use('/health-check', healthCheckRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/categories', categoryRouter);
app.use('/themes', themeRouter);
app.use('/contents', contentRouter);
app.use('/uploads', express.static(path.resolve('uploads')));
app.use('/upload', uploadRouter);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
