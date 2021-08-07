import cookie from 'cookie';
import jwt from 'jsonwebtoken';

import dbConnect from '$lib/config/db';
import User from '$lib/models/User';
import { API_VERSION_V1_0 } from '$lib/config/server';

export async function post(req) {
	try {
		await dbConnect();

		let expiredDate;

		const { subscriptionType } = req.body;
		const { cookie: cookies } = req.headers;

		const userData = jwt.verify(cookie.parse(cookies).jwt, 'this-is-a-secret-key');
		const userId = userData.id;

		if (subscriptionType === 'monthly')
			expiredDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

		if (subscriptionType === 'yearly')
			expiredDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 12);

		const user = await User.findByIdAndUpdate(
			userId,
			{ premiumExpired: expiredDate },
			{ new: true }
		);

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
			body: err
		};
	}
}
