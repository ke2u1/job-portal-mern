import axiosInstance from "@/lib/axiosInstance";

const BASE = "applications";
// Get all applications by a user (for job seekers)
export const getUserApplications = async () => {
  const { data } = await axiosInstance.get(`/${BASE}/get-user-applications`);
  return data;
};

export const applyForJob = async (jobId) => {
  const { data } = await axiosInstance.post(`/${BASE}/${jobId}/apply`, {
    jobId,
  });
  return data;
};

/* ==================================== */

// for recruiters
export const getJobApplications = async (jobId) => {
  const { data } = await axiosInstance.get(
    `/${BASE}/${jobId}/get-job-applications`
  );
  return data;
};

export const getRecruiterDashboard = async () => {
  const { data } = await axiosInstance.get(`/${BASE}/recruiter/dashboard`);
  return data;
};

export const updateApplicationStatus = async (applicationId, status) => {
  const { data } = await axiosInstance.put(
    `/${BASE}/update-status/${applicationId}/${status}`
  );
  return data;
};
