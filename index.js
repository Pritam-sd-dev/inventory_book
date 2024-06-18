import express from 'express';
import { config } from 'dotenv';
import { test } from './middlewares/test.js';
import userRouter from './routes/user.route.js';
import connectDB from './config/dbConnection.js';

config();
const PORT = process.env.PORT || 8000;

const app = express();

//middlewares
app.use(express.json());
app.use(test);

// routes
app.use("/api/v1/users", userRouter);

app.use('/api/v1/ping', (req, res) => {
    return res.json('server is up and running at port ' +  PORT);
});

app.listen(PORT, async () => {
    connectDB();
    console.log(`server has started on port: ${PORT}`);
});