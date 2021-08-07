import validator from 'validator';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

import dbConnect from '$lib/config/db';
import User from '$lib/models/User';
import { API_VERSION_V1_0 } from '$lib/config/server';

const { isEmail } = validator;

export async function post(req) {
	const { email, password } = req.body;

	if (!email || !password || !isEmail(email))
		return {
			status: 400,
			body: {
				apiVersion: API_VERSION_V1_0,
				error: 'please input valid request'
			}
		};

	try {
		await dbConnect();

		const user = await User.findOne({ email }).select('+password');
		await user.checkPassword(password, user.password);

		if (!user || !(await user.checkPassword(password, user.password))) {
			return {
				status: 401,
				body: {
					apiVersion: API_VERSION_V1_0,
					error: 'Invalid password or email'
				}
			};
		}

		const jwtToken = jwt.sign({ id: user._id }, 'this-is-a-secret-key', {
			expiresIn: '30d'
		});
		return {
			status: 200,
			headers: {
				'Set-Cookie': cookie.serialize('jwt', jwtToken, {
					maxAge: 1000 * 60 * 60 * 24 * 30,
					path: '/'
				})
			},
			body: {
				apiVersion: API_VERSION_V1_0,
				data: user
			}
		};
	} catch (err) {
		return {
			status: 500,
			body: {
				apiVersion: API_VERSION_V1_0,
				error: 'Internal server error!'
			}
		};
	}
}
