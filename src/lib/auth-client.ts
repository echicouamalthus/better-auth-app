import { env } from '@/env';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
	baseURL: env.BETTER_AUTH_URL,
});

export const { signIn, signOut, useSession } = authClient;
