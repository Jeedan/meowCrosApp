// Error Shape
// {
//   "success": false,
//   "error": {
//     "code": "NOT_FOUND",
//     "message": "Route not found"
//   }
// }

import { type Request, type Response, type NextFunction } from "express";
import AppError from "../utils/AppError.ts";

export function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			success: false,
			error: {
				code: err.code,
				message: err.message,
			},
		});
	}
	console.error(err);

	return res.status(500).json({
		success: false,
		error: {
			code: "INTERNAL_ERROR",
			message: "Something went wrong",
		},
	});
}
