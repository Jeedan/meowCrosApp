import type { Request, Response } from "express";
import { UnauthorizedError, ValidationError } from "../utils/AppError.ts";
import {
	createFood,
	deleteFoodById,
	getFoodById,
	getFoods,
	updateFood,
} from "../db/queries/foods.ts";
import { respondWithJson } from "../utils/json.ts";
import {
	foodIdSchema,
	foodInputSchema,
} from "../../../shared/schemas/foods.schema.ts";
import { getUserId } from "../utils/getUser.ts";

export async function handlerGetFoods(req: Request, res: Response) {
	const userId = getUserId(res);

	const foods = await getFoods(userId);

	respondWithJson(res, 200, foods);
}

export async function handlerGetFoodById(req: Request, res: Response) {
	const userId = getUserId(res);

	const foodId = parseFoodId(req);

	const food = await getFoodById(userId, foodId);

	respondWithJson(res, 200, food);
}

export async function handlerCreateFood(req: Request, res: Response) {
	const userId = getUserId(res);

	// parse the body using Zod to make sure we are receiving appropriate data shape
	// Validate the untrusted request body against the shared food schema.
	const parsed = parseBody(req, "Food data is invalid.");

	const food = await createFood(userId, parsed);

	respondWithJson(res, 201, food);
}

export async function handlerUpdateFood(req: Request, res: Response) {
	const userId = getUserId(res);

	const parsed = parseBody(req, "Food data is invalid.");

	// parse food id from params and validate it with zod before passing it on to updateFood
	const foodId = parseFoodId(req);

	const updatedFood = await updateFood(userId, foodId, parsed);

	respondWithJson(res, 200, updatedFood);
}

export async function handlerDeleteFood(req: Request, res: Response) {
	const userId = getUserId(res);

	const foodId = parseFoodId(req);

	const deletedFood = await deleteFoodById(userId, foodId);
	respondWithJson(res, 200, deletedFood);
}

// todo: maybe make schema more generic but for now it works
function parseBody(req: Request, message: string) {
	const parsed = foodInputSchema.safeParse(req.body);
	if (!parsed.success) {
		const issues = parsed.error.issues;
		throw new ValidationError(message, issues);
	}

	return parsed.data;
}

function parseFoodId(req: Request) {
	const parsedFoodId = foodIdSchema.safeParse(req.params.foodId);
	if (!parsedFoodId.success) {
		throw new ValidationError(
			"Invalid food ID.",
			parsedFoodId.error.issues,
		);
	}

	return parsedFoodId.data;
}
