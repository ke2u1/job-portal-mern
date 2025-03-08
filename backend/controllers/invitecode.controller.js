import { generateRandomCode } from "../utils/generateRandomCodes.js";
import InviteCode from "../models/InviteCode.js";

import { createError } from "../utils/error.js";

// Generate a new invite code
export const generateInviteCode = async (req, res, next) => {
  console.log("generate invite code", req.body);
  try {
    const { role, email } = req.body;

    // Check if a code for this email already exists and is unused
    const existingInvite = await InviteCode.findOne({ email, isUsed: false });
    if (existingInvite) {
      return next(
        createError(400, "An invite code for this email already exists.")
      );
    }

    const code = await generateRandomCode();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Code expires in 7 days

    const newInviteCode = new InviteCode({
      code,
      role,
      email,
      expiresAt,
    });

    await newInviteCode.save();
    return res.status(201).json({ success: true, inviteCode: code, expiresAt });
  } catch (error) {
    console.log(error);
    return next(createError(500, "Failed to generate invite code."));
  }
};

// Verify invite code during registration
export const verifyInviteCode = async (req, res, next) => {
  try {
    const { code } = req.body;

    const inviteCode = await InviteCode.findOne({ code, isUsed: false });
    if (!inviteCode) {
      return next(createError(400, "Invalid or expired invite code."));
    }

    if (inviteCode.expiresAt < new Date()) {
      return next(createError(400, "Invite code has expired."));
    }

    // Mark the invite code as used
    inviteCode.isUsed = true;
    await inviteCode.save();

    return res
      .status(200)
      .json({
        success: true,
        message: "Invite code verified.",
        role: inviteCode.role,
      });
  } catch (error) {
    return next(createError(500, "Failed to verify invite code."));
  }
};
