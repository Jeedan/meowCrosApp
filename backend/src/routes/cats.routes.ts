import { Router } from "express";
import {
	handlerCreateCat,
	handlerGetCats,
	handlerUpdateCat,
} from "../controllers/cats.controller.ts";
import { authenticateHandler } from "../middleware/authenticateHandler.ts";
import { validateRequest } from "../middleware/validateRequest.ts";
import {
	catParamsSchema,
	catProfileInputSchema,
	catProfilePatchSchema,
} from "../../../shared/schemas/cats.schema.ts";

const router = Router();

router.use(authenticateHandler);

router
	.route("/cats")
	.get(handlerGetCats)
	.post(
		validateRequest(catProfileInputSchema, "body", "Invalid Cat Data."),
		handlerCreateCat,
	);

router
	.route("/cats/:catId")
	.patch(
		validateRequest(catParamsSchema, "params", "Invalid Cat ID."),
		validateRequest(catProfilePatchSchema, "body", "Invalid Cat Data."),
		handlerUpdateCat,
	);

export default router;
