import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';
import { ADMIN_STATUS } from './constant/app.constant.js';
import { hashPassword } from './helper/common.helper.js';
import adminModel from './models/admin/admin.auth.model.js';
import router from './routes/index.js';
import './connection/connecttion.js';

// ES Modules fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Environment configuration
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3002',
    'https://main.d1bw0n2dnzdvzw.amplifyapp.com',
    'https://master.d20bjzw7wn0bxs.amplifyapp.com',
    process.env.FRONTEND_PROD_URL || 'https://your-production-domain.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));

// Static files and Swagger documentation
const publicPath = path.join(__dirname, '..', 'public');
const swaggerPath = path.join(publicPath, 'swagger');

app.use(express.static(publicPath));
app.use('/swagger.json', express.static(path.join(swaggerPath, 'swagger.json')));

app.use('/api-docs', 
  swaggerUi.serve, 
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
      displayRequestDuration: true,
      persistAuthorization: true,
    },
    customSiteTitle: 'API Documentation'
  })
);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Admin account initialization
const initializeAdminAccount = async () => {
  try {
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@yopmail.com';
    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || '123456';
    
    const existingAdmin = await adminModel.findOne({ 
      email: adminEmail,
      status: ADMIN_STATUS.ACTIVE
    });

    if (!existingAdmin) {
      const hashedPassword = await hashPassword(adminPassword);
      await adminModel.create({
        name: 'Admin',
        email: adminEmail,
        password: hashedPassword,
        status: ADMIN_STATUS.ACTIVE
      });
      console.log('✅ Admin account initialized');
    }
  } catch (error) {
    console.error('❌ Error initializing admin account:', error);
  }
};

// API routes
app.use('/api/v1', router);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📄 API Docs: http://localhost:${PORT}/api-docs`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Initialize admin account after server starts
  initializeAdminAccount();
});
