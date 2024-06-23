import express from 'express';
import { config } from 'dotenv';
import userRouter from './routes/user.route.js';
import shopRouter from './routes/shop.route.js';
import connectDB from './config/dbConnection.js';
import cookieParser from 'cookie-parser';

config();
const PORT = process.env.PORT || 8000;

const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/shops", shopRouter);

app.use('/api/v1/ping', (req, res) => {
    return res.json('server is up and running at port ' +  PORT);
});

app.listen(PORT, async () => {
    connectDB();
    console.log(`server has started on port: ${PORT}`);
});