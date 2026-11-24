import { and, eq } from "drizzle-orm";
import { db } from "../index.ts";
import { ConflictError, NotFoundError } from "../../utils/AppError.ts";
import { catsTable } from "../cats-schema.ts";
import type {
	CatProfileData,
	CatProfileInput,
	CatProfilePatch,
	CatProfileResponse,
} from "../../../../shared/schemas/cats.schema.ts";

type CatsRow = typeof catsTable.$inferSelect;

export async function getCat(userId: string): Promise<CatProfileData> {
	const [result] = await db
		.select()
		.from(catsTable)
		.where(eq(catsTable.userId, userId));

	if (!result) throw new NotFoundError("Resource not found.");
	return buildCatResponse(result);
}

export async function createCat(
	userId: string,
	cat: CatProfileInput,
): Promise<CatProfileData> {
	const [result] = await db
		.insert(catsTable)
		.values({
			userId: userId,
			name: cat.name,
			goal: cat.goal,
			isNeutered: cat.isNeutered,
			sex: cat.sex,
			weightKg: cat.weightKg.toString(),
			ageMonths: cat.ageMonths,
			dailyCalorieTargetOverride:
				cat.dailyCalorieTargetOverride?.toString() ?? null,
		})
		.onConflictDoNothing({ target: catsTable.userId })
		.returning();

	if (!result) throw new ConflictError("User already has a cat.");
	return buildCatResponse(result);
}

export async function updateCat(
	userId: string,
	catId: string,
	data: CatProfilePatch,
): Promise<CatProfileData> {
	const [result] = await db
		.update(catsTable)
		.set({
			name: data.name,
			goal: data.goal,
			isNeutered: data.isNeutered,
			sex: data.sex,
			weightKg: data.weightKg?.toString(),
			ageMonths: data.ageMonths,
			dailyCalorieTargetOverride:
				data.dailyCalorieTargetOverride === undefined
					? undefined
					: (data.dailyCalorieTargetOverride?.toString() ?? null),
		})
		.where(and(eq(catsTable.userId, userId), eq(catsTable.id, catId)))
		.returning();

	if (!result) throw new NotFoundError("Resource not found.");
	return buildCatResponse(result);
}

function buildCatResponse(input: CatsRow): CatProfileData {
	return {
		id: input.id,
		userId: input.userId,
		name: input.name,
		sex: input.sex,
		weightKg: Number(input.weightKg),
		ageMonths: Number(input.ageMonths),
		isNeutered: input.isNeutered,
		goal: input.goal,
		dailyCalorieTargetOverride:
			input.dailyCalorieTargetOverride !== null
				? Number(input.dailyCalorieTargetOverride)
				: null,
		createdAt: input.createdAt.toISOString(),
		updatedAt: input.updatedAt.toISOString(),
	};
}
