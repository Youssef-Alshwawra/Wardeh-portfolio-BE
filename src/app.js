import express from 'express';
import routes from './routes/index.js';

const app = express();

app.use(routes);

app.use((error, req, res, next) => {
    console.log(`Error!: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error! '});
});

export default app;