import type { Request, Response } from "express";
import { getUserId } from "../utils/getUser.ts";
import { respondWithJson } from "../utils/json.ts";
import {
	type CatProfileInput,
	type CatProfileParams,
	type CatProfilePatch,
} from "../../../shared/schemas/cats.schema.ts";
import {
	createCatService,
	getCatService,
	updateCatService,
} from "../services/cats.services.ts";

// Test	Expected result
// GET existing cat	Returns profile
// GET nonexistent cat	404
// POST first cat	Returns created profile
// POST second cat	409
// PATCH name only	Other fields unchanged
// PATCH weight	Weight updated
// PATCH override to null	Override cleared
// PATCH override to a number	Override updated
// PATCH another user's cat ID	404
// PATCH nonexistent cat ID	404

export async function handlerGetCats(req: Request, res: Response) {
	const userId = getUserId(res);

	const payload = await getCatService(userId);

	respondWithJson(res, 200, payload);
}

export async function handlerCreateCat(req: Request, res: Response) {
	const userId = getUserId(res);

	const body = res.locals.validatedData.body as CatProfileInput;
	
	const payload = await createCatService(userId, body);

	respondWithJson(res, 201, payload);
}

export async function handlerUpdateCat(req: Request, res: Response) {
	const userId = getUserId(res);

	const params = res.locals.validatedData.params as CatProfileParams;
	const body = res.locals.validatedData.body as CatProfilePatch;

	const catId = params.catId;
	const payload = await updateCatService(userId, catId, body);

	respondWithJson(res, 200, payload);
}
