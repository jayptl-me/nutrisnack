import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { calorieRoutes } from './routes/calorie';
import { chatRoutes } from './routes/chat';
import { serve } from '@hono/node-server';

// Create the main Hono app
const app = new Hono();

// Get allowed origins from environment variable or use defaults
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000', 'http://localhost:5173', 'https://nutrisnack.onrender.com'];

// Apply global middlewares
app.use('*', logger());
app.use('*', cors({
  origin: allowedOrigins,
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}));

// Mount the calorie routes at /api/calorie
app.route('/api/calorie', calorieRoutes);
// Mount the chat routes at /api/chat
app.route('/api/chat', chatRoutes);

// Add a basic health check endpoint
app.get('/', (c) => c.text('API Server is running'));

// Get port from environment variable or use default
const PORT = parseInt(process.env.PORT || '3000', 10);

// Start the server using the imported serve function
console.log(`Server is running on port ${PORT}`);
console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);

serve({
  fetch: app.fetch,
  port: PORT
});
