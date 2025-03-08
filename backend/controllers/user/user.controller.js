import fs from "fs/promises";
import mongoose from "mongoose";
import Job from "../../models/Job.js";
import { User } from "../../models/User.js";
import { createError } from "../../utils/error.js";
import { upload } from "../../config/multer.js";
import { uploadToCloudinary } from "../../config/cloudinary.js";

// Get User Profile (public route)
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
      .select("-password")
      .populate("projects")
      .populate("experience")
      .populate("education")
      .populate("bookmarkedJobs")
      .populate("company", "name logo");

    if (!user) return next(createError(404, "User not found!"));
    res.status(200).json({
      success: true,
      message: "User profile fetched successfully!",
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Fetch Current Protected
export const fetchCurrentUser = async (req, res, next) => {
  try {
    // The user ID is attached to the request by the authentication middleware
    const userId = req.user.id;

    // Fetch the user from the database, excluding the password
    const user = await User.findById(userId)
      .select("-password")
      .populate("projects")
      .populate("experience")
      .populate("education")
      .populate("bookmarkedJobs")
      .populate("companies", "name logo");

    if (!user) {
      return next(createError(404, "User not found"));
    }

    // Send the user data
    res.status(200).json({
      success: true,
      message: "Current user data fetched successfully!",
      user,
    });
  } catch (error) {
    console.error("Error fetching current user:", error);
    next(createError(500, "Error fetching user data"));
  }
};
// Update User Profile
export const updateUserAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("projects")
      .populate("experience")
      .populate("education")
      .populate("bookmarkedJobs")
      .populate("companies", "name logo");
    if (!user) return next(createError(404, "User not found!"));

    const updatedAuthData = {
      email: req.body.email || user.email,
      role: req.body.role || user.role,
      isVerified: req.body.isVerified || user.isVerified,
      inviteCodeUsed: req.body.inviteCodeUsed || user.inviteCodeUsed,
    };

    // Update user auth fields
    Object.assign(user, updatedAuthData);
    const updatedUser = await user.save();

    // Remove sensitive information before sending response
    const { password, ...userWithoutPassword } = updatedUser.toObject();

    res.status(200).json({
      success: true,
      message: "User Auth updated successfully!",
      user: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

// Update User Profile
export const updateProfile = async (req, res, next) => {
  const userId = req.user.id;
  console.log("upating profile", req.user.id);
  try {
    const user = await User.findById(userId)
      .select("-password")
      .populate("projects")
      .populate("experience")
      .populate("education")
      .populate("bookmarkedJobs")
      .populate("companies", "name logo");

    if (!user) return next(createError(404, "User not found!"));

    const updatedProfileData = {
      profilePic: req.body.profilePic || user.profilePic,
      fullName: req.body.fullName || user.fullName,
      bio: req.body.bio || user.bio,
      contact: req.body.contact || user.contact,
      contactEmail: req.body.contactEmail || user.contactEmail,
      designation: req.body.designation || user.designation,
      address: req.body.address || user.address,
      skills: req.body.skills || user.skills,
      profileLinks: req.body.profileLinks || user.profileLinks,
      company: req.body.company || user.company,
    };

    // Update user profile fields
    Object.assign(user, updatedProfileData);
    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "User profile updated successfully!",
      updatedUser,
    });
  } catch (error) {
    console.log("Error updating profile", req.user.id);
    next(error);
  }
};

// Update profile
export const updateProfilePic = [
  upload.single("profilePic"),
  async (req, res, next) => {
    try {
      if (!req.file) {
        return next(createError(400, "No file uploaded"));
      }

      const user = await User.findById(req.user.id);
      if (!user) {
        return next(createError(404, "User not found!"));
      }

      // Upload to Cloudinary and get URL
      const profilePicUrl = await uploadToCloudinary(req.file);

      // Update user's profile picture URL
      user.profilePic = profilePicUrl;
      await user.save();

      // Clean up uploaded file
      await fs.unlink(req.file.path);

      res.status(200).json({
        success: true,
        message: "Profile picture updated successfully!",
        profilePic: profilePicUrl,
      });
    } catch (error) {
      // Clean up uploaded file if it exists
      if (req.file) {
        await fs.unlink(req.file.path).catch(console.error);
      }
      next(error);
    }
  },
];

// Delete User Account
export const deleteUserAccount = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) return next(createError(404, "User not found!"));

    res
      .status(200)
      .json({ success: true, message: "User account deleted successfully." });
  } catch (error) {
    next(error);
  }
};

// Change User Password (only after logged in from settings)
export const changePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return next(createError(404, "User not found!"));

    const { currentPassword, newPassword } = req.body;

    // Check if the current password is correct
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch)
      return next(createError(400, "Current password is incorrect"));

    // Set the new password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const toggleBookmarkJob = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("bookmarkedJobs");
    console.log("User found:", user ? "Yes" : "No");
    if (!user) return next(createError(404, "User not found!"));

    const jobId = req.params.jobId;
    console.log("Job ID from params:", jobId);

    const job = await Job.findById(jobId);
    console.log("Job found:", job ? "Yes" : "No");
    if (!job) return next(createError(404, "Job not found!"));

    // Convert jobId to ObjectId for accurate comparison
    const jobObjectId = new mongoose.Types.ObjectId(jobId);

    console.log("jobObjectId", jobObjectId);
    const isBookmarked = user.bookmarkedJobs.some((id) =>
      id.equals(jobObjectId)
    );
    console.log("Is job already bookmarked?", isBookmarked);

    if (isBookmarked) {
      console.log("Removing bookmark");
      user.bookmarkedJobs = user.bookmarkedJobs.filter(
        (id) => !id.equals(jobObjectId)
      );
    } else {
      console.log("Adding bookmark");
      user.bookmarkedJobs.push(jobObjectId);
    }

    await user.save();
    console.log("User saved successfully");

    res.status(200).json({
      success: true,
      message: isBookmarked
        ? "Job unbookmarked successfully."
        : "Job bookmarked successfully.",
      bookmarkedJobs: user.bookmarkedJobs,
    });
  } catch (error) {
    console.error("Error in toggleBookmarkJob:", error);
    next(error);
  }
};
