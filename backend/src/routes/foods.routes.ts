import { Router } from "express";
import {
	handlerCreateFood,
	handlerDeleteFood,
	handlerGetFoods,
	handlerGetFoodById,
	handlerUpdateFood,
} from "../controllers/foods.controller.ts";
import { authenticateHandler } from "../middleware/authenticateHandler.ts";
import { validateRequest } from "../middleware/validateRequest.ts";
import { foodIdSchema, foodInputSchema } from "../../../shared/index.ts";

const router = Router();

// router level middleware
router.use(authenticateHandler);

// GET: get foods
// POST: create foods
router
	.route("/foods")
	.get(handlerGetFoods)
	.post(
		validateRequest(foodInputSchema, "body", "Invalid Food Data."),
		handlerCreateFood,
	);
// PUT: update Foods
// DELETE: delete foods
router
	.route("/foods/:foodId")
	.get(handlerGetFoodById)
	.put(
		validateRequest(foodIdSchema, "params", "Invalid Food ID."),
		validateRequest(foodInputSchema, "body", "Invalid Food Data."),
		handlerUpdateFood,
	)
	.delete(
		validateRequest(foodIdSchema, "params", "Invalid Food ID."),
		handlerDeleteFood,
	);
export default router;
