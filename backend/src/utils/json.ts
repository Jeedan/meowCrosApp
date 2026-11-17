import type { Response } from "express";

export function respondWithJson(
	res: Response,
	statusCode: number,
	payload: unknown,
) {
	res.header("Content-Type", "application/json");
	res.status(statusCode).json({ success: true, data: payload });
}

export function respondWithError(
	res: Response,
	statusCode: number,
	code: string,
	message: string,
) {
	res.header("Content-Type", "application/json");
	res.status(statusCode).json({
		success: false,
		error: {
			code,
			message,
		},
	});
}
