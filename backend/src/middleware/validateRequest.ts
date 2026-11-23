import type { NextFunction, Request, Response } from "express";
import { parseInput } from "../utils/parseInput.ts";
import type { z } from "zod";

type ReqSource = "body" | "params" | "query";

export function validateRequest<T extends z.ZodType>(
	schema: T,
	source: ReqSource,
	message: string,
) {
	return (req: Request, res: Response, next: NextFunction) => {
		const validData = parseInput(req[source], schema, message);
		// create an object if it doesn't exist
		// then populate with our source
		res.locals.validatedData ??= {};
		res.locals.validatedData[source] = validData;
		next();
	};
}
