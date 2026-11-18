import type { Request, Response } from "express";
import { UnauthorizedError, ValidationError } from "../utils/AppError.ts";
import { createFood, getFoods, updateFood } from "../db/queries/foods.ts";
import { respondWithJson } from "../utils/json.ts";
import {
	foodIdSchema,
	foodInputSchema,
} from "../../../shared/schemas/foods.schema.ts";

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

	// parse the body using Zod to make sure we are receiving appropriate data shape
	// Validate the untrusted request body against the shared food schema.
	const parsed = foodInputSchema.safeParse(req.body);

	if (!parsed.success) {
		const issues = parsed.error.issues;
		throw new ValidationError("Food data is invalid.", issues);
	}

	const food = await createFood(userId, parsed.data);

	respondWithJson(res, 201, food);
}

export async function handlerUpdateFood(req: Request, res: Response) {
	const user = res.locals.user;
	if (!user)
		throw new UnauthorizedError("Unauthorized access, sign-in required.");

	const userId = user.id;

	// parse body
	const parsed = foodInputSchema.safeParse(req.body);
	if (!parsed.success) {
		const issues = parsed.error.issues;
		throw new ValidationError("Food data is invalid.", issues);
	}

	// parse food id from params and validate it with zod before passing it on to updateFood
	const parsedFoodId = foodIdSchema.safeParse(req.params.foodId);

	if (!parsedFoodId.success) {
		throw new ValidationError(
			"Invalid food ID.",
			parsedFoodId.error.issues,
		);
	}

	const foodId = parsedFoodId.data;

	// update food.
	const updatedFood = await updateFood(userId, foodId, parsed.data);

	// return
	respondWithJson(res, 200, updatedFood);
}
