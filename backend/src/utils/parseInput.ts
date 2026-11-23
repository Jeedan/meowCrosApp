import type { z } from "zod";
import { ValidationError } from "./AppError.ts";

//T represents the actual schema passed to the function.
// z.output<T> extracts the type that schema produces after parsing.
// safeParse() returns that same output type when successful.
export function parseInput<T extends z.ZodType>(
	input: unknown,
	schema: T,
	message: string,
) : z.output<T>{
	const parsed = schema.safeParse(input);
	if (!parsed.success) {
		const issues = parsed.error.issues;
		throw new ValidationError(message, issues);
	}

	return parsed.data;
}
