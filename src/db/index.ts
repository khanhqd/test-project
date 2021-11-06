import mongoose from 'mongoose';

const dbHost = process.env.DB_HOST || 'localhost'
const dbPort = process.env.DB_PORT || 27017
const dbName = process.env.DB_NAME || 'youtubeshare'
const mongoUrl = `mongodb://${dbHost}:${dbPort}/${dbName}`

export const connectWithRetry = function () {
	return mongoose.connect(mongoUrl, {}, (err) => {
		if (err) {
			console.error('Failed to connect to mongo on startup - retrying in 5 sec')
			console.log(err);
			setTimeout(connectWithRetry, 5000)
		} else {
			console.log('connect db success')
		}
	})
}
