import express from "express";
import {
  friendUser,
  unfriendUser,
  getAllFriends,
} from "../controllers/userFriendController.js";

const router = express.Router();

/**
 * @swagger
 * /userFriends/friend/{myBadgeCode}/{friendBadgeCode}:
 *   post:
 *     summary: Create a friendship between two users
 *     description: |
 *       Creates a friendship (bidirectional) between the user identified by `myBadgeCode`
 *       and the user identified by `friendBadgeCode`.
 *     tags:
 *       - UserFriend
 *     parameters:
 *       - in: path
 *         name: myBadgeCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Badge code of the initiating user
 *       - in: path
 *         name: friendBadgeCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Badge code of the friend user
 *     responses:
 *       200:
 *         description: Successfully created friendship
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Friendship created successfully!"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *             example:
 *               message: "Error friending user"
 *               error: "User not found."
 */
router.post("/friend/:myBadgeCode/:friendBadgeCode", friendUser);

/**
 * @swagger
 * /userFriends/unfriend/{myBadgeCode}/{friendBadgeCode}:
 *   post:
 *     summary: Remove a friendship between two users
 *     description: |
 *       Removes the friendship (bidirectional) between the user identified by `myBadgeCode`
 *       and the user identified by `friendBadgeCode`.
 *     tags:
 *       - UserFriend
 *     parameters:
 *       - in: path
 *         name: myBadgeCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Badge code of the initiating user
 *       - in: path
 *         name: friendBadgeCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Badge code of the friend user
 *     responses:
 *       200:
 *         description: Successfully removed friendship
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Friendship removed successfully!"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *             example:
 *               message: "Error unfriending user"
 *               error: "Friendship does not exist."
 */
router.post("/unfriend/:myBadgeCode/:friendBadgeCode", unfriendUser);

/**
 * @swagger
 * /userFriends/{badgeCode}/friends:
 *   get:
 *     summary: Retrieve all friends for a user
 *     description: >
 *       Returns a list of all friends for the user identified by `badgeCode`.
 *       The result includes each friend's badge code and the date the friendship was established.
 *     tags:
 *       - UserFriend
 *     parameters:
 *       - in: path
 *         name: badgeCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Badge code of the user whose friends you want to retrieve
 *     responses:
 *       200:
 *         description: A list of friend objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   friend:
 *                     type: string
 *                     description: Badge code of the friend
 *                   friends_since:
 *                     type: string
 *                     format: date-time
 *                     description: Timestamp indicating when the friendship was created
 *             example:
 *               - friend: "FRIEND123"
 *                 friends_since: "2025-02-08T10:20:30.000Z"
 *               - friend: "FRIEND456"
 *                 friends_since: "2025-02-09T08:15:00.000Z"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *             example:
 *               message: "Error getting friends"
 *               error: "User not found."
 */
router.get("/:badgeCode/friends", getAllFriends);

export default router;
