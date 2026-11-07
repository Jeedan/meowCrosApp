import { catProfileCreationFormSchema } from "../../shared/index.ts";

const result = catProfileCreationFormSchema.safeParse({});

console.log(result);