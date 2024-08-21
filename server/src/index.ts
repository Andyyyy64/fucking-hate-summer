import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import dataRouter from './routes/dataRoutes';

dotenv.config();

const app: express.Express = express();
const PORT: number = Number(process.env.PORT) || 5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/data', dataRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});