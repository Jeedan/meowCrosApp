// Error Shape
// {
//   "success": false,
//   "error": {
//     "code": "NOT_FOUND",
//     "message": "Route not found"
//   }
// }

import { type Request, type Response, type NextFunction } from "express";
import { NotFoundError } from "../../utils/AppError.ts";

export function notFoundHandler(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const error = new NotFoundError("Route not found");

	next(error);
}
