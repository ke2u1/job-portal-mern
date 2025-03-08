import { Router } from "express";
import {
  generateInviteCode,
  verifyInviteCode,
} from "../controllers/invitecode.controller.js";
import { authorize, protect } from "../middleware/auth.middleware.js";

const router = Router();
router.use(protect);

/**
 * @swagger
 * /invitecode/generate:
 *   post:
 *     summary: Generate a new invite code
 *     description: Only admins should be allowed to generate invite codes.
 *     tags: [Invite Codes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [admin, recruiter, jobSeeker]
 *                 description: The role for which the invite code is generated.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the invitee.
 *     responses:
 *       201:
 *         description: Invite code generated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 inviteCode:
 *                   type: string
 *                 expiresAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: An invite code for this email already exists.
 *       500:
 *         description: Failed to generate invite code.
 */
router.post("/generate", authorize("admin"), generateInviteCode);

/**
 * @swagger
 * /invitecode/verify:
 *   post:
 *     summary: Verify an invite code
 *     description: Verify invite code during registration.
 *     tags: [Invite Codes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: The invite code to verify.
 *     responses:
 *       200:
 *         description: Invite code verified successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 role:
 *                   type: string
 *       400:
 *         description: Invalid or expired invite code.
 *       500:
 *         description: Failed to verify invite code.
 */
router.post("/verify", verifyInviteCode);

export default router;
