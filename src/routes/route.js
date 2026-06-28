// @ts-check
import express from "express";
const router = express.Router();

import rEnt from "../entities/route.js";
import history from "../middlewares/history.js";
import { checkRoutePattern } from "../middlewares/validators/check-route-pattern.js";

// Get routes
router.post("/search", rEnt.get);
// Get version history of a specific route
router.get("/:id/history", history.get("route"));
// add a route.
router.post("/", rEnt.addArraySubstack);
// Update a route.
router.put("/", checkRoutePattern, rEnt.updateArraySubstack);
// Bulk archive
router.post("/archive", rEnt.archive);

export default router;
