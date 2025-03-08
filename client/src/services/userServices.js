import axiosInstance from "@/lib/axiosInstance";

// Base API URL
const BASE_URL = "/user";

export const updateProfilePicture = async (file) => {
  try {
    const formData = new FormData();
    formData.append("profilePic", file);

    const { data } = await axiosInstance.put(
      `${BASE_URL}/profile-pic`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error updating profile picture"
    );
  }
};

// Fetch current user
export const fetchCurrentUser = async () => {
  const { data } = await axiosInstance.get(`${BASE_URL}/current-user`);
  return data;
};

// Fetch single user by ID
export const fetchUserById = async (userId) => {
  const { data } = await axiosInstance.get(`${BASE_URL}/${userId}`);
  return data;
};

// Update user by ID
export const updateUserProfile = async (userData) => {
  const { data } = await axiosInstance.put(
    `${BASE_URL}/profile-update`,
    userData
  );
  return data;
};

// Delete user by ID
export const deleteUser = async () => {
  const { data } = await axiosInstance.delete(`${BASE_URL}/delete`);
  return data;
};

// Change user password
export const changePassword = async (passwords) => {
  const { data } = await axiosInstance.put(
    `${BASE_URL}/change-password`,
    passwords // current and newPasword
  );
  return data;
};

// Update user auth profile for updating email,password (there is already a route for update password),invitecode
export const updateUserAuth = async (authData) => {
  const { data } = await axiosInstance.put(`${BASE_URL}/auth-update`, authData);
  return data;
};

/* ------------------- EDUCATION ROUTES ------------------------ */
// Fetch all educations
export const fetchEducations = async () => {
  const { data } = await axiosInstance.get(`${BASE_URL}/get-educations`);
  return data;
};

// Add education
export const addEducation = async (educationData) => {
  const { data } = await axiosInstance.post(
    `${BASE_URL}/add-education`,
    educationData
  );
  return data;
};

// Update education
export const updateEducation = async (eduId, educationData) => {
  const { data } = await axiosInstance.put(
    `${BASE_URL}/update-education/${eduId}`,
    educationData
  );
  return data;
};

// Remove education
export const removeEducation = async (eduId) => {
  const { data } = await axiosInstance.delete(
    `${BASE_URL}/delete-education/${eduId}`
  );
  return data;
};

/* ------------------- EXPERIENCE ROUTES ------------------------ */
// Fetch all experiences
export const fetchExperiences = async () => {
  const { data } = await axiosInstance.get(`${BASE_URL}/get-experiences`);
  return data;
};

// Add experience
export const addExperience = async (experienceData) => {
  const { data } = await axiosInstance.post(
    `${BASE_URL}/add-experience`,
    experienceData
  );
  return data;
};

// Update experience
export const updateExperience = async (expId, experienceData) => {
  const { data } = await axiosInstance.put(
    `${BASE_URL}/update-experience/${expId}`,
    experienceData
  );
  return data;
};

// Remove experience
export const removeExperience = async (expId) => {
  const { data } = await axiosInstance.delete(
    `${BASE_URL}/experience/${expId}`
  );
  return data;
};

/* ------------------- PROJECTS ROUTES ------------------------ */
// Fetch all projects
export const fetchProjects = async () => {
  const { data } = await axiosInstance.get(`${BASE_URL}/get-projects`);
  return data;
};

// Add project
export const addProject = async (projectData) => {
  const { data } = await axiosInstance.post(
    `${BASE_URL}/add-project`,
    projectData
  );
  return data;
};

// Update project
export const updateProject = async (projectId, projectData) => {
  const { data } = await axiosInstance.put(
    `${BASE_URL}/update-project/${projectId}`,
    projectData
  );
  return data;
};

// Remove project
export const removeProject = async (projectId) => {
  const { data } = await axiosInstance.delete(
    `${BASE_URL}/delete-project/${projectId}`
  );
  return data;
};

// Toggle bookmark job
export const toggleBookmarkJob = async (jobId) => {
  const { data } = await axiosInstance.put(
    `${BASE_URL}/${jobId}/toggle-bookmark`
  );
  return data;
};
