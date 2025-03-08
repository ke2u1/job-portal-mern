import { Experience, User } from "../../models/User.js";

export const getExperiences = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("experience");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Experiences fetched successfully",
        experiences: user.experience,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to get experiences" });
  }
};

export const addExperience = async (req, res) => {
  const experienceData = req.body;
  console.log("userExperience", req.body);
  console.log("is it even receiving the job title?", experienceData);
  try {
    // Create a new experience
    const newExperience = new Experience(experienceData);
    await newExperience.save();

    // Add experience reference to the user
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { experience: newExperience._id } },
      { new: true }
    ).populate("experience");

    res
      .status(201)
      .json({
        success: true,
        message: "Experience added successfully",
        experiences: user.experience,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to add experience" });
  }
};

export const updateExperience = async (req, res) => {
  const { experienceId } = req.params;
  const updatedData = req.body;

  try {
    const updatedExperience = await Experience.findByIdAndUpdate(
      experienceId,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedExperience) {
      return res
        .status(404)
        .json({ success: false, message: "Experience not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Experience updated successfully",
        experience: updatedExperience,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update experience" });
  }
};

export const removeExperience = async (req, res) => {
  const { experienceId } = req.params;

  try {
    await Experience.findByIdAndDelete(experienceId);

    // Remove experience reference from user
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { experience: experienceId } },
      { new: true }
    );

    res
      .status(200)
      .json({
        success: true,
        message: "Experience removed successfully",
        experiences: user.experience,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to remove experience" });
  }
};
