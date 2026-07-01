
import express from "express";
const router = express.Router();

import rEnt from "../entities/route.js";
import history from "../middlewares/history.js";
import { checkRoutePattern } from "../middlewares/validators/check-route-pattern.js";
import { send204 } from "../middlewares/res/send-204.js";


router.post("/search", send204);

router.get("/:id/history", history.get("route"));

router.post("/", rEnt.addArraySubstack);

router.put("/", checkRoutePattern, rEnt.updateArraySubstack);

router.post("/archive", rEnt.archive);

export default router;
