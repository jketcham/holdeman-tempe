import type { KVNamespace } from '@cloudflare/workers-types';

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

type RateLimitData = {
	attempts: number;
	expiresAt: number;
};

export async function checkRateLimit(
	ip: string,
	kv: KVNamespace
): Promise<{ allowed: boolean; minutesRemaining?: number }> {
	const key = `login_attempts:${ip}`;
	const data = await kv.get<RateLimitData>(key, 'json');
	const now = Date.now();

	if (!data) {
		await kv.put(
			key,
			JSON.stringify({
				attempts: 1,
				expiresAt: now + WINDOW_MS
			}),
			{ expirationTtl: Math.ceil(WINDOW_MS / 1000) }
		);
		return { allowed: true };
	}

	const { attempts, expiresAt } = data;

	if (attempts >= MAX_ATTEMPTS) {
		const minutesRemaining = Math.max(1, Math.ceil((expiresAt - now) / 60000));
		return { allowed: false, minutesRemaining };
	}

	const remainingSeconds = Math.max(1, Math.ceil((expiresAt - now) / 1000));

	await kv.put(
		key,
		JSON.stringify({
			attempts: attempts + 1,
			expiresAt
		}),
		{ expirationTtl: remainingSeconds }
	);

	return { allowed: true };
}
