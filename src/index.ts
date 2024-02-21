import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './config/connectDB';
import  contactRoutes from './routes/contactRoutes'

dotenv.config();
const app = express();
connectDB();
const port = process.env.PORT ?? 8000;

app.use(bodyParser.json());
app.use(
    cors({
        origin: ["http://localhost:3000", "https://elemar.site"],
        credentials: true
    })
);

app.use('/api', contactRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
