import Application from "../models/Application.js";
import Job from "../models/Job.js";
import { User } from "../models/User.js";
import { createError } from "../utils/error.js";

export const applyForJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.id;

    // Find the job
    const job = await Job.findById(jobId);
    if (!job) {
      return next(createError(404, "Job not found"));
    }

    // Check if an application already exists
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user.id,
    });

    let application;
    let message;

    if (existingApplication) {
      // If application exists, remove it
      const deletedApplication = await Application.findByIdAndDelete(
        existingApplication._id
      );

      // Remove applicant from job
      await Job.findByIdAndUpdate(jobId, {
        $pull: { applicants: deletedApplication._id },
      });

      message = "Application removed successfully";
    } else {
      // If no application exists, create one
      application = new Application({
        job: jobId,
        applicant: userId,
      });
      const savedApplication = await application.save();

      // Add applicant to job
      await Job.findByIdAndUpdate(jobId, {
        $addToSet: { applicants: savedApplication._id },
      });

      message = "Applied for job successfully";
    }

    // Fetch the updated job
    const updatedJob = await Job.findById(jobId).populate("applicants");

    return res.status(200).json({
      success: true,
      message,
      job: updatedJob,
      application: application || null,
    });
  } catch (error) {
    console.error("Error applying/unapplying for job:", error);
    return next(error);
  }
};

export const getRecruiterDashboard = async (req, res, next) => {
  try {
    const recruiterId = req.user.id;

    // Get the recruiter's companies
    const recruiter = await User.findById(recruiterId).populate("company");

    if (
      !recruiter ||
      !recruiter.companies ||
      recruiter.companies.length === 0
    ) {
      return next(createError(404, "Recruiter or companies not found"));
    }

    const companyIds = recruiter.companies.map((company) => company._id);

    // Count of active jobs across all companies
    const activeJobsCount = await Job.countDocuments({
      company: { $in: companyIds },
      status: "open",
    });

    // Total applications across all companies
    const totalApplications = await Application.countDocuments({
      job: {
        $in: await Job.find({ company: { $in: companyIds } }).select("_id"),
      },
    });

    // Total interviews across all companies
    const totalInterviews = await Application.countDocuments({
      job: {
        $in: await Job.find({ company: { $in: companyIds } }).select("_id"),
      },
      status: "interview",
    });

    // New applications (last 7 days) across all companies
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const newApplications = await Application.countDocuments({
      job: {
        $in: await Job.find({ company: { $in: companyIds } }).select("_id"),
      },
      appliedAt: { $gte: sevenDaysAgo },
    });

    // Recent job postings (last 5) across all companies
    const recentJobs = await Job.find({ company: { $in: companyIds } })
      .sort({ postedAt: -1 })
      .limit(5)
      .populate("company", "name logo")
      .select(
        "title location.city location.country postedAt company applicants"
      );

    // Recent applications (last 5) across all companies
    const recentApplications = await Application.find({
      job: {
        $in: await Job.find({ company: { $in: companyIds } }).select("_id"),
      },
    })
      .sort({ appliedAt: -1 })
      .limit(5)
      .populate("job", "title company")
      .populate("applicant", "fullName")
      .select("status appliedAt");

    // Populate company names for recent applications
    await Application.populate(recentApplications, {
      path: "job.company",
      select: "name",
    });

    return res.status(200).json({
      activeJobsCount,
      totalApplications,
      totalInterviews,
      newApplications,
      recentJobs,
      recentApplications,
    });
  } catch (error) {
    return next(error);
  }
};

// Get all applications for a job (for employers)
export const getJobApplications = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;

    const job = await Job.findById(jobId);
    if (!job) return next(createError(404, "Job not found!"));

    const applications = await Application.find({ job: jobId })
      .populate({
        path: "applicant",
        select: "email profilePic fullName experience skills yoe address",
        populate: {
          path: "experience",
          model: "Experience",
        },
      })
      .populate("job", "title");

    return res.status(200).json(applications);
  } catch (error) {
    return next(error);
  }
};

// Get all applications by a user (for job seekers)
export const getUserApplications = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log("getUserApplication");

    const user = await User.findById(userId);

    if (!user) return next(createError(404, "User not found!"));

    const applications = await Application.find({
      applicant: userId,
    }).populate({
      path: "job",
      populate: {
        path: "company",
        select: "name logo",
      },
    });

    return res.status(200).json({
      success: true,
      applications,
      message: "User Applications fetched successfully!",
    });
  } catch (error) {
    console.log("UserAppErrr:", error);
    return next(error);
  }
};

// Update application status (for employers)
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { applicationId, status } = req.params;

    console.log("status:::::==>", req.params);

    const application = await Application.findById(applicationId);
    if (!application) return next(createError(404, "Application not found!"));

    application.status = status;
    const updatedApplication = await application.save();
    return res.status(200).json(updatedApplication);
  } catch (error) {
    return next(error);
  }
};
