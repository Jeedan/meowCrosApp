import type { Request, Response } from "express";
import {
	createFood,
	deleteFoodById,
	getFoodById,
	getFoods,
	updateFood,
} from "../db/queries/foods.ts";
import { respondWithJson } from "../utils/json.ts";
import {
	type FoodId,
	type FoodInput,
} from "../../../shared/schemas/foods.schema.ts";
import { getUserId } from "../utils/getUser.ts";

export async function handlerGetFoods(req: Request, res: Response) {
	const userId = getUserId(res);

	const foods = await getFoods(userId);

	respondWithJson(res, 200, foods);
}

export async function handlerGetFoodById(req: Request, res: Response) {
	const userId = getUserId(res);

	const params = res.locals.validatedData.params as FoodId;
	const foodId = params.foodId;

	const food = await getFoodById(userId, foodId);

	respondWithJson(res, 200, food);
}

export async function handlerCreateFood(req: Request, res: Response) {
	const userId = getUserId(res);

	const body = res.locals.validatedData.body as FoodInput;
	const food = body;
	const payload = await createFood(userId, food);

	respondWithJson(res, 201, payload);
}

export async function handlerUpdateFood(req: Request, res: Response) {
	const userId = getUserId(res);

	const params = res.locals.validatedData.params as FoodId;
	const body = res.locals.validatedData.body as FoodInput;
	const foodId = params.foodId;
	const payload = body;

	const updatedFood = await updateFood(userId, foodId, payload);

	respondWithJson(res, 200, updatedFood);
}

export async function handlerDeleteFood(req: Request, res: Response) {
	const userId = getUserId(res);

	const params = res.locals.validatedData.params as FoodId;
	const foodId = params.foodId;

	const deletedFood = await deleteFoodById(userId, foodId);
	respondWithJson(res, 200, deletedFood);
}
