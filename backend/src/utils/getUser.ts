import type { Response } from "express";
import { UnauthorizedError } from "./AppError.ts";

// todo: move to utils or authenticateHandler.ts and export it from there
export function getUserId(res: Response): string {
	const user = res.locals.user;
	if (!user)
		throw new UnauthorizedError("Unauthorized access, sign-in required.");

	return user.id;
}
