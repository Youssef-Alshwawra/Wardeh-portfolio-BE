import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes/index.js';

const app = express();

// Security headers
app.use(helmet());

// CORS - Allow frontend connections
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        process.env.FRONTEND_URL || 'http://localhost:3000'
    ],
    credentials: true, // Allow cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'Portfolio API' });
});

app.use(routes);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        success: false,
        message: 'Route not found',
        path: req.originalUrl 
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error(`Error: ${error.message}`);
    
    res.status(error.status || 500).json({ 
        success: false,
        message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : error.message
    });
});

export default app;