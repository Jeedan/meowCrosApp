import type { Request, Response } from "express";
import { UnauthorizedError, ValidationError } from "../utils/AppError.ts";
import { createFood, getFoods } from "../db/queries/foods.ts";
import { respondWithJson } from "../utils/json.ts";
import { foodInputSchema } from "../../../shared/schemas/foods.schema.ts";

export async function handlerGetFoods(req: Request, res: Response) {
	// grab userId from the current session
	const user = res.locals.user;
	if (!user)
		throw new UnauthorizedError("Unauthorized access, sign-in required.");

	const userId = user.id;

	const foods = await getFoods(userId);

	respondWithJson(res, 200, foods);
}

export async function handlerCreateFood(req: Request, res: Response) {
	const user = res.locals.user;
	if (!user)
		throw new UnauthorizedError("Unauthorized access, sign-in required.");

	const userId = user.id;

	// parse the body using Zod to make sure we are receiving appropriate untampered data.
	const parsed = foodInputSchema.safeParse(req.body);

	if (!parsed.success)
		throw new ValidationError(
			`Validation Error: ${JSON.stringify(parsed.error.issues, null, 2)}`,
		);

	const food = await createFood(userId, parsed.data);

	respondWithJson(res, 201, food);
}
