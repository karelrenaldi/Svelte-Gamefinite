import cookie from 'cookie';

export async function handle({ request, resolve }) {
	const cookies = cookie.parse(request.headers.cookie || '');

	request.locals.authenticated = !cookies.jwt ? false : true;

	const response = await resolve(request);

	return {
		...response,
		headers: {
			...response.headers
		}
	};
}

export function getSession(request) {
	let authenticated = request.locals.authenticated;

	if (!authenticated) {
		const cookies = cookie.parse(request.headers.cookie || '');
		authenticated = !cookies.jwt ? false : true;
	}

	return {
		authenticated
	};
}
