import express from 'express';
import cors from 'cors';
import { verifyRequest } from 'src/middlewares/VerifyRequest'
import { catchError } from 'src/middlewares/CatchError';
import { registerRouters } from 'src/routers';

const PORT = process.env.PORT || 3000

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
