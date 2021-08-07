import validator from 'validator';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

import dbConnect from '$lib/config/db';
import User, { isValidUser } from '$lib/models/User';
import { API_VERSION_V1_0 } from '$lib/config/server';

const { isEmail } = validator;

export async function post(req) {
	const payload = req.body;

	if (!isValidUser(payload))
		return {
			status: 400,
			body: {
				apiVersion: API_VERSION_V1_0,
				error: 'please input valid request'
			}
		};

	try {
		await dbConnect();

		const user = await User.create(payload);
		const jwtToken = jwt.sign({ id: user._id }, 'this-is-a-secret-key', {
			expiresIn: '30d'
		});

		return {
			status: 201,
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
		if (err.code === 11000) {
			const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0].replace(/"/g, '');
			if (isEmail(value))
				return {
					status: 400,
					body: {
						apiVersion: API_VERSION_V1_0,
						error: 'This email has already been taken'
					}
				};
		}

		return {
			status: 500,
			body: {
				apiVersion: API_VERSION_V1_0,
				error: 'Internal server error!'
			}
		};
	}
}
