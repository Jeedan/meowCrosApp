import { Router } from "express";
import {
	handlerCreateCat,
	handlerGetCats,
	handlerUpdateCat,
} from "../controllers/cats.controller.ts";
import { authenticateHandler } from "../middleware/authenticateHandler.ts";

const router = Router();

router.use(authenticateHandler);

router.route("/cats").get(handlerGetCats).post(handlerCreateCat);

router.route("/cats/:catId").patch(handlerUpdateCat);

export default router;
