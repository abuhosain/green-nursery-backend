import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import notFound from './app/middleware/notFound';
import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandlers';

const app: Application = express();

// Middleware setup
app.use(express.json());
app.use(cookieParser());

// CORS setup
app.use(cors({
  origin: ['http://localhost:5173', 'https://green-nursery-frontend.vercel.app'],
  credentials: true,
}));

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, '..', 'build')));

// Application routes
app.use('/api/', router);

// Test route
app.get('/', async (req: Request, res: Response) => {
  const message = 'Green nursery server is running';
  res.send(message);
});

// Catch-all route for client-side routing
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// Global error handler
app.use(globalErrorHandler);

// Not found route
app.use(notFound);

export default app;
