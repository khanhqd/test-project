import mongoose from 'mongoose';

interface UserType extends mongoose.Document {
	email: string,
	password: string,
	salt: string,
	createdAt: Date,
	updatedAt: Date,
}

let userSchema = new mongoose.Schema({
	email: String,
	password: String,
	salt: String,
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function (next) {
	this.updatedAt = new Date();
	next();
});

userSchema.methods.getInfo = function () {
	delete this.password;
	delete this._v;
	return this;
}

const User = mongoose.model<UserType>('users', userSchema);

export default User;
