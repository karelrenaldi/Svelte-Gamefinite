import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const { isEmail } = validator;

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please tell us your name!']
	},
	email: {
		type: String,
		required: [true, 'Please provide your email'],
		unique: [true, 'Email has been taken'],
		lowercase: true,
		validate: [validator.isEmail, 'Please provide a valid email']
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
		minlength: 8,
		select: false
	},
	status: {
		type: String,
		enum: ['premium', 'regular'],
		default: 'regular'
	},
	premiumExpired: Date,
	createdAt: {
		type: Date,
		default: new Date()
	}
});

UserSchema.pre('save', async function (next) {
	// Only run this function if password was actually modified
	if (!this.isModified('password')) return next();

	// Hash the password
	this.password = await bcrypt.hash(this.password, 12);

	next();
});

UserSchema.methods.checkPassword = async (inputPassword, actualPassword) => {
	return await bcrypt.compare(inputPassword, actualPassword);
};

export const isValidUser = (input) => {
	try {
		if (typeof input.name !== 'string') return false;
		if (typeof input.password !== 'string') return false;

		if (input.password.length < 8) return false;

		if (!isEmail(input.email)) return false;

		return true;
	} catch {
		return false;
	}
};

export default mongoose.model('User', UserSchema);
