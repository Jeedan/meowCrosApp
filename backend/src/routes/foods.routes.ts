import { Router } from "express";
import {
	handlerCreateFood,
	handlerGetFoods,
	handlerUpdateFood,
} from "../controllers/foods.controller.ts";
import { authenticateHandler } from "../middleware/authenticateHandler.ts";

const router = Router();

// router level middleware
router.use(authenticateHandler);

// GET: get foods
// POST: create foods
router.route("/foods").get(handlerGetFoods).post(handlerCreateFood);
// PUT: update Foods
// DELETE: delete foods
router.route("/foods/:id").put(handlerUpdateFood);
export default router;
