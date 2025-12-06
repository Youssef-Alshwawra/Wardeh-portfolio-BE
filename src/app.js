import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes/index.js';

const app = express();

app.use(helmet());

app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        process.env.FRONTEND_URL,
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

app.get('/health', (req, res) => {
    res.json({ status: 'OK', service: 'Portfolio API' });
});

app.use(routes);

app.use((req, res) => {
    res.status(404).json({ 
        success: false,
        message: 'Route not found',
        path: req.originalUrl 
    });
});

app.use((error, req, res, next) => {
    console.error(`Error: ${error.message}`);
    
    res.status(error.status || 500).json({ 
        success: false,
        message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : error.message
    });
});

export default app;