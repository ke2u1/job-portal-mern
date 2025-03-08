import { Project, User } from "../../models/User.js";

// Get all projects of the user
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.id });
    if (!projects || projects.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Projects not found" });
    }
    res.status(200).json({ success: true, projects });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to get projects" });
  }
};

// Add a new project
export const addProject = async (req, res) => {
  const projectData = req.body;
  try {
    // Create a new project
    const newProject = new Project(projectData);
    await newProject.save();

    // Add project reference to the user
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { projects: newProject._id } },
      { new: true }
    ).populate("projects");

    res.status(201).json({
      success: true,
      message: "Project added successfully!",
      projects: user.projects,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add project" });
  }
};

// Update an existing project
export const updateProject = async (req, res) => {
  const { projectId } = req.params;
  const updatedData = req.body;
  console.log("request received");
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $set: updatedData },
      { new: true, upsert: true }
    );

    if (!updatedProject) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    console.log("updated data", updatedProject);
    res.status(200).json({
      success: true,
      message: "Project updated successfully!",
      project: updatedProject,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update project" });
  }
};

// Remove a project
export const removeProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    await Project.findByIdAndDelete(projectId);

    // Remove project reference from user
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { projects: projectId } },
      { new: true }
    );

    res
      .status(200)
      .json({
        success: true,
        message: "Project removed successfully!",
        projects: user.projects,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to remove project" });
  }
};
