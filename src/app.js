import express from 'express';

const app = express();


app.use((error, req, res, next) => {
    console.log(`Error!: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error! '});
});

export default app;