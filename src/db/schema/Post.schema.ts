import mongoose from 'mongoose';

interface PostType extends mongoose.Document {
	url: String,
	updateAt: Number,
	createAt: Number,
	author: String,
}

let postSchema = new mongoose.Schema({
	url: String,
	updateAt: { type: Date, default: Date.now },
	createAt: { type: Date, default: Date.now },
	author: { type: String, ref: 'users' },
});

postSchema.pre('save', async function (next) {
	this.updatedAt = new Date();
	next();
});

const Post = mongoose.model<PostType>('posts', postSchema);

export default Post;
