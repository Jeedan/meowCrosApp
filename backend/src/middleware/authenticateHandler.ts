import type { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth.ts";
import { fromNodeHeaders } from "better-auth/node";
import AppError, { UnauthorizedError } from "../utils/AppError.ts";

export async function authenticateHandler(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const session = await auth.api.getSession({
		headers: fromNodeHeaders(req.headers),
	});

	// unauthorized if no session exists
	if (!session) {
		throw new UnauthorizedError("Unauthorized access, sign-in required.");
	}
	res.locals.user = session.user;
	next();
}
