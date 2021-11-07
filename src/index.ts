import express from 'express';
import cors from 'cors';
import { verifyRequest } from 'src/middlewares/VerifyRequest'
import { catchError } from 'src/middlewares/CatchError';
import apiV1Routers from 'src/routers';
import { connectWithRetry } from 'src/db';
import moment from 'moment-timezone';

const dotenv = require('dotenv');
dotenv.config();

// connect DB
connectWithRetry();

// set default timezone
moment.tz.setDefault('Asia/Ho_Chi_Minh');

let PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'test') {
	PORT = 8008
}

const app = express();

app.use(cors());
app.use(express.json());

if (NODE_ENV !== 'test' && NODE_ENV !== 'development') {
	// verify request signature
	app.use(verifyRequest);
}

app.use('/', apiV1Routers);

app.use(catchError);

app.listen(PORT, () => {
	console.log(
		`Listening at ${PORT}`,
	);
});

module.exports = app; // for testing
