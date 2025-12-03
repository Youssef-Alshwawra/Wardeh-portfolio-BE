import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(routes);

app.use((error, req, res, next) => {
    console.log(`Error!: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error! '});
});

export default app;