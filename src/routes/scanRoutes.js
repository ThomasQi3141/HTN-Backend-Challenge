import express from "express";
import { scanUser } from "../controllers/scanController.js";

const router = express.Router();

/**
 * @swagger
 * /scan/{code}:
 *   put:
 *     summary: Scan a user into an activity
 *     description: Adds a scan record for a user and increments the scan count for the activity.
 *     tags:
 *       - Scans
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: The badge code of the user.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               activity_name:
 *                 type: string
 *                 example: "giving_go_a_go"
 *               activity_category:
 *                 type: string
 *                 example: "workshop"
 *     responses:
 *       200:
 *         description: Successfully scanned user into an activity.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 activity_name:
 *                   type: string
 *                   example: "giving_go_a_go"
 *                 scanned_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-01-19T03:00:27.836055"
 *                 activity_category:
 *                   type: string
 *                   example: "workshop"
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       400:
 *         description: Invalid request body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid activity data"
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
router.put("/:code", scanUser);

export default router;
