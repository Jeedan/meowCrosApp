import { createCat, getCat, updateCat } from "../db/queries/cats.ts";
import type {
	CatProfileData,
	CatProfileInput,
	CatProfilePatch,
	CatProfileResponse,
} from "../../../shared/schemas/cats.schema.ts";
import { calcTotalDailyCalories } from "../utils/calorieCalculator.ts";

export async function getCatService(
	userId: string,
): Promise<CatProfileResponse> {
	const cat = await getCat(userId);
	return buildCatResponse(cat);
}

export async function createCatService(
	userId: string,
	catData: CatProfileInput,
): Promise<CatProfileResponse> {
	const cat = await createCat(userId, catData);
	return buildCatResponse(cat);
}

export async function updateCatService(
	userId: string,
	catId: string,
	catData: CatProfilePatch,
): Promise<CatProfileResponse> {
	const cat = await updateCat(userId, catId, catData);
	return buildCatResponse(cat);
}

function buildCatResponse(catData: CatProfileData): CatProfileResponse {
	return { ...catData, dailyCalorieTarget: calcTotalDailyCalories(catData) };
}
