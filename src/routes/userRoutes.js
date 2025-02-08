import express from "express";
import {
  getAllUsers,
  getUserByBadge,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     description: Fetch a list of all registered users, including their scans.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Successfully retrieved users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   email:
 *                     type: string
 *                     example: "john@example.com"
 *                   phone:
 *                     type: string
 *                     example: "+1 (555) 123-4567"
 *                   badge_code:
 *                     type: string
 *                     example: "ABC123"
 *                   updated_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-02-06T12:30:00.000Z"
 *                   scans:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         activity_name:
 *                           type: string
 *                           example: "Check-in"
 *                         scanned_at:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-02-06T12:30:00.000Z"
 *                         activity_category:
 *                           type: string
 *                           example: "Entry"
 *       404:
 *         description: No users found.
 *       500:
 *         description: Internal server error.
 */
router.get("/", getAllUsers);

/**
 * @swagger
 * /users/{code}:
 *   get:
 *     summary: Retrieve a user by badge code
 *     description: Fetch a user based on their unique badge code, including their activity scans.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: The badge code of the user.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "john@example.com"
 *                 phone:
 *                   type: string
 *                   example: "+1 (555) 123-4567"
 *                 badge_code:
 *                   type: string
 *                   example: "ABC123"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-02-06T12:30:00.000Z"
 *                 scans:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       activity_name:
 *                         type: string
 *                         example: "Check-in"
 *                       scanned_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-02-06T12:30:00.000Z"
 *                       activity_category:
 *                         type: string
 *                         example: "Entry"
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:code", getUserByBadge);

/**
 * @swagger
 * /users/{code}:
 *   put:
 *     summary: Update user information
 *     description: Update a user's details using their badge code. This allows for partial updates but does not update activity scans.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: The badge code of the user to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               phone:
 *                 type: string
 *                 example: "+1 (555) 123-4567"
 *     responses:
 *       200:
 *         description: Successfully updated user information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "john@example.com"
 *                 phone:
 *                   type: string
 *                   example: "+1 (555) 123-4567"
 *                 badge_code:
 *                   type: string
 *                   example: "ABC123"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-02-06T12:30:00.000Z"
 *                 scans:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       activity_name:
 *                         type: string
 *                         example: "Check-in"
 *                       scanned_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-02-06T12:30:00.000Z"
 *                       activity_category:
 *                         type: string
 *                         example: "Entry"
 *       404:
 *         description: User not found.
 *       400:
 *         description: Invalid update fields provided.
 *       500:
 *         description: Internal server error.
 */
router.put("/:code", updateUser);

export default router;
