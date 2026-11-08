// Error Shape
// {
//   "success": false,
//   "error": {
//     "code": "NOT_FOUND",
//     "message": "Route not found"
//   }
// }

import { type Request, type Response, type NextFunction } from "express";
import AppError from "../../utils/AppError.ts";

export function notFoundHandler(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const error = new AppError(404, "NOT_FOUND", "Route not found");

	next(error);
}
