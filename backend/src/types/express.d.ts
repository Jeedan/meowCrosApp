import type { auth } from "../lib/auth.ts";

type AuthUser = typeof auth.$Infer.Session.user;

declare global {
	namespace Express {
		interface Locals {
			user?: AuthUser;
		}
	}
}

export {};
