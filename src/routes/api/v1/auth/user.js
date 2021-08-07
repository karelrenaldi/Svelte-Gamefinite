import jwt from 'jsonwebtoken';
import cookie from 'cookie';

import { API_VERSION_V1_0 } from '$lib/config/server';
import User from '$lib/models/User';
import dbConnect from '$lib/config/db';

export async function get(req) {
	try {
		await dbConnect();
		const { cookie: cookies } = req.headers;

		const userData = jwt.verify(cookie.parse(cookies).jwt, 'this-is-a-secret-key');
		const userId = userData.id;
		const user = await User.findById(userId);

		return {
			status: 200,
			body: {
				apiVersion: API_VERSION_V1_0,
				data: user
			}
		};
	} catch (err) {
		return {
			status: 500,
			body: 'failed'
		};
	}
}
