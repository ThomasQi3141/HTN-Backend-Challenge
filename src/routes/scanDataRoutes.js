import express from "express";
import { getScans } from "../controllers/scanController.js";

const router = express.Router();

/**
 * @swagger
 * /scans:
 *   get:
 *     summary: Get aggregated scan data for activities
 *     description: Returns a list of activities along with their scan counts, with optional filtering by min/max frequency and activity category.
 *     tags:
 *       - Scans
 *     parameters:
 *       - in: query
 *         name: min_frequency
 *         schema:
 *           type: integer
 *         description: Minimum number of scans (inclusive)
 *       - in: query
 *         name: max_frequency
 *         schema:
 *           type: integer
 *         description: Maximum number of scans (inclusive)
 *       - in: query
 *         name: activity_category
 *         schema:
 *           type: string
 *         description: Category of the activity
 *     responses:
 *       200:
 *         description: Returns a list of activities with their frequency (scan_count).
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   activity_name:
 *                     type: string
 *                     example: "giving_go_a_go"
 *                   scan_count:
 *                     type: integer
 *                     example: 42
 *                   activity_category:
 *                     type: string
 *                     example: "workshop"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get("/scans", getScans);

export default router;
