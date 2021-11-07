import express from 'express';
import cors from 'cors';
import { verifyRequest } from 'src/middlewares/VerifyRequest'
import { catchError } from 'src/middlewares/CatchError';
import { registerRouters } from 'src/routers';
import { connectWithRetry } from 'src/db';
import moment from 'moment-timezone';

const dotenv = require('dotenv');
dotenv.config();

// connect DB
connectWithRetry();

// set default timezone
moment.tz.setDefault('Asia/Ho_Chi_Minh');

const PORT = process.env.PORT || 8080

const app = express();

app.use(cors());
app.use(express.json());
app.use(verifyRequest);

app.use('/', registerRouters);

app.use(catchError);

app.listen(PORT, () => {
	console.log(
		`Listening at ${PORT}`,
	);
});
