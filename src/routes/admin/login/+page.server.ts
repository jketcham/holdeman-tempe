import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { Actions } from './$types';
import { checkRateLimit } from '$lib/rateLimit';

export const actions: Actions = {
	default: async ({ cookies, request, getClientAddress, platform }) => {
		const ip = getClientAddress();
		const rateLimit = await checkRateLimit(ip, platform?.env?.AUTH_STORE);

		if (!rateLimit.allowed) {
			return fail(429, {
				error: `Too many login attempts. Please try again in ${rateLimit.minutesRemaining} minutes.`
			});
		}

		const data = await request.formData();
		const password = data.get('password');

		if (password !== env.ADMIN_PASSWORD) {
			return fail(400, { error: 'Invalid password' });
		}

		cookies.set('admin_session', env.ADMIN_SESSION_SECRET, {
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 // 24 hours
		});

		throw redirect(303, '/admin');
	}
};
