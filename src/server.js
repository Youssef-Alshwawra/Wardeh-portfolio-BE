import 'dotenv/config';
import app from "./app";

const PORT = process.env.PORT;

if (!PORT) throw new Error('PORT env is required!');

app.listen(PORT, () => {
    console.log(`The Server Running Successfully AT: ${PORT}`);
});