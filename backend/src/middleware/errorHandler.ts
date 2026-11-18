// Error Shape
// {
//   "success": false,
//   "error": {
//     "code": "NOT_FOUND",
//     "message": "Route not found"
//   }
// }

import { type Request, type Response, type NextFunction } from "express";
import AppError, { ValidationError } from "../utils/AppError.ts";
import { respondWithError } from "../utils/json.ts";

export function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	if (err instanceof AppError) {
		return respondWithError(
			res,
			err.statusCode,
			err.code,
			err.message,
			err.details,
		);
	}
	console.error(err);

	return respondWithError(
		res,
		500,
		"INTERNAL_ERROR",
		"An unexpected server error occurred.",
	);
}
