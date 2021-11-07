import mongoose from 'mongoose';

interface LinkType extends mongoose.Document {
	link: String,
	updateAt: Number,
	createAt: Number,
	userId: String,
}

let linkSchema = new mongoose.Schema({
	link: String,
	updateAt: { type: Date, default: Date.now },
	createAt: { type: Date, default: Date.now },
	userId: { type: String, ref: 'users' },
});

linkSchema.pre('save', async function (next) {
	this.updatedAt = new Date();
	next();
});

const Link = mongoose.model<LinkType>('links', linkSchema);

export default Link;
