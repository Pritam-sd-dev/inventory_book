import express from 'express';
import { config } from 'dotenv';
import { test } from './middlewares/test.js';

config();
const app = express();
const PORT = process.env.PORT || 8000;

//middlewares
app.use(express.json());
app.use(test);

app.use('/api/v1/ping', (req, res) => {
    res.json('server is up and running at port ' +  PORT);
});

app.listen(PORT, () => console.log(`server has started on port: ${PORT}`));