import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";

import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";
import {
  generateToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";

const setTokenCookie = (res, token, refreshToken) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction, // Only secure in production
    sameSite: isProduction ? "none" : "lax", // 'none' in production, 'lax' in development
    maxAge: 20 * 60 * 1000, // 20 minutes
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction, // Only secure in production
    sameSite: isProduction ? "none" : "lax", // 'none' in production, 'lax' in development
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const register = [
  async (req, res, next) => {
    try {
      const { email, password, ...otherDetails } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return next(createError(400, "Email is already in use."));
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const verificationToken = crypto.randomBytes(20).toString("hex");

      const newUser = new User({
        email,
        password: hashedPassword,
        verificationToken,
        ...otherDetails,
      });
      const savedUser = await newUser.save();

      // Send verification email
      /* const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`; */
      /* await sendEmail({
        email: savedUser.email,
        subject: "Verify your email",
        message: `Please click on this link to verify your email: ${verificationUrl}`,
      }); */

      const { password: _, ...userDetails } = savedUser._doc;

      res.status(201).json({
        success: true,
        message:
          "User successfully registered. Please check your email to verify your account.",
        user: userDetails,
      });
    } catch (error) {
      console.error("Registration error:", error);
      // Attempt to delete the user if any error occurred during registration
      try {
        await User.deleteOne({ email: req.body.email });
        console.log(
          "User with email:",
          req.body.email,
          "deleted successfully due to registration error."
        );
      } catch (deleteError) {
        console.error("Error deleting user:", deleteError);
      }
      next(error);
    }
  },
];

export const login = [
  async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(createError(400, "Email and password are required"));
      }

      const user = await User.findOne({ email }).select("+password");
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(createError(401, "Invalid credentials"));
      }

      // enable email verification later

      /*    if (!user.isVerified) {
        return next(
          createError(401, "Please verify your email before logging in")
        );
      } */

      if (!process.env.JWT_ACCESS_SECRET) {
        console.log("NO JWT VARIABLEs");
        return next(createError(500, "JWT environment variable is missing"));
      }

      const token = generateToken(user);
      const refreshToken = generateRefreshToken(user);
      setTokenCookie(res, token, refreshToken);
      console.log("login success!");
      res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      next(createError(500, "An unexpected error occurred during login"));
    }
  },
];

export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.cookie("refreshToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

/* export const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(createError(404, "User not found"));

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message: `You requested a password reset. Please make a PUT request to: ${resetUrl}`,
    });

    res.status(200).json({
      success: true,
      message: "Password reset email sent",
    });
  } catch (error) {
    console.error("Forget password error:", error);
    next(createError(500, "FORGET_PASSWORD: Internal Server Error"));
  }
}; */

export const forgetPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(createError(404, "User not found"));
    console.log("forget-password invoked");

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Forget password error:", error);
    next(createError(500, "FORGET_PASSWORD: Internal Server Error"));
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(createError(400, "Invalid or expired password reset token"));
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password has been successfully reset.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    next(createError(500, "RESET_PASSWORD: Internal Server Error"));
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return next(createError(400, "Invalid or expired verification token"));
    }

    if (user.isVerified) {
      return next(createError(400, "Email already verified"));
    }

    await User.findOneAndUpdate(
      { verificationToken: token },
      { isVerified: true, verificationToken: undefined },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Email verified successfully.",
    });
  } catch (error) {
    console.error("Email verification error:", error);
    next(createError(500, "EMAIL_VERIFICATION: Internal Server Error"));
  }
};

export const refreshToken = async (req, res, next) => {
  console.log("refreshToken triggered!!!!!!", req.cookies);
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return next(createError(401, "Refresh token not found"));
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    console.log("decoded refresh token");

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(createError(401, "User not found"));
    }

    const newAccessToken = generateToken(user);
    const newRefreshToken = generateRefreshToken(user);

    setTokenCookie(res, newAccessToken, newRefreshToken);

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    if (error.name === "TokenExpiredError") {
      return next(createError(401, "Refresh token expired"));
    }
    next(createError(401, "Invalid refresh token"));
  }
};
