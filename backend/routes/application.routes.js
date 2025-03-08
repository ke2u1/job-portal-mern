import { protect, authorize } from "../middleware/auth.middleware.js";
import {
  applyForJob,
  getJobApplications,
  getUserApplications,
  updateApplicationStatus,
  getRecruiterDashboard,
} from "../controllers/application.controller.js";

import { Router } from "express";

const router = Router();
router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Recruiter
 *   description: Recruiter related endpoints
 */

/**
 * @swagger
 * /api/applications/recruiter/dashboard:
 *   get:
 *     summary: Get Recruiter Dashboard
 *     tags: [Recruiter]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved recruiter dashboard data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 activeJobsCount:
 *                   type: number
 *                 totalApplications:
 *                   type: number
 *                 totalInterviews:
 *                   type: number
 *                 newApplications:
 *                   type: number
 *                 recentJobs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Job'
 *                 recentApplications:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Application'
 *       404:
 *         description: Recruiter or companies not found
 */
router.get("/recruiter/dashboard", getRecruiterDashboard);

/**
 * @swagger
 * /api/applications/{jobId}/get-job-applications:
 *   get:
 *     summary: Get job applications for a specific job
 *     tags: [Recruiter]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: jobId
 *         in: path
 *         required: true
 *         description: ID of the job to get applications for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved job applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 *       404:
 *         description: Job not found
 */
router.get(
  "/:jobId/get-job-applications",
  authorize("recruiter"),
  getJobApplications
);

/**
 * @swagger
 * /api/applications/update-status/{applicationId}/{status}:
 *   put:
 *     summary: Update application status
 *     tags: [Recruiter]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: applicationId
 *         in: path
 *         required: true
 *         description: ID of the application to update
 *         schema:
 *           type: string
 *       - name: status
 *         in: path
 *         required: true
 *         description: New status for the application
 *         schema:
 *           type: string
 *           enum: [applied, reviewing, interview, hired, rejected]
 *     responses:
 *       200:
 *         description: Successfully updated application status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 *       404:
 *         description: Application not found
 */
router.put(
  "/update-status/:applicationId/:status",
  authorize("recruiter"),
  updateApplicationStatus
);

/**
 * @swagger
 * tags:
 *   name: Job Seeker
 *   description: Job Seeker related endpoints
 */

/**
 * @swagger
 * /api/applications/{jobId}/apply:
 *   post:
 *     summary: Apply for a job
 *     tags: [Job Seeker]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: jobId
 *         in: path
 *         required: true
 *         description: ID of the job to apply for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully applied for the job
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 job:
 *                   $ref: '#/components/schemas/Job'
 *                 application:
 *                   $ref: '#/components/schemas/Application'
 *       404:
 *         description: Job not found
 */
router.post("/:jobId/apply", applyForJob);

/**
 * @swagger
 * /api/applications/get-user-applications:
 *   get:
 *     summary: Get all applications by the user
 *     tags: [Job Seeker]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user applications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 applications:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Application'
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found
 */
router.get("/get-user-applications", getUserApplications);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Application:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         job:
 *           $ref: '#/components/schemas/Job'
 *         applicant:
 *           $ref: '#/components/schemas/User'
 *         status:
 *           type: string
 *           enum: [applied, reviewing, interview, hired, rejected]
 *         appliedAt:
 *           type: string
 *           format: date-time
 *
 *     Job:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         company:
 *           $ref: '#/components/schemas/Company'
 *         postedBy:
 *           $ref: '#/components/schemas/User'
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         location:
 *           type: object
 *           properties:
 *             city:
 *               type: string
 *             state:
 *               type: string
 *             country:
 *               type: string
 *         salaryRange:
 *           type: object
 *           properties:
 *             min:
 *               type: string
 *             max:
 *               type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         frequency:
 *           type: string
 *           enum: [hourly, monthly, yearly]
 *         skillsRequired:
 *           type: array
 *           items:
 *             type: string
 *         postedAt:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum: [open, closed]
 *         jobType:
 *           type: string
 *           enum: [full time, part time, internship]
 *         workFrom:
 *           type: string
 *           enum: [remote, on-site, hybrid]
 *         experience:
 *           type: string
 *           enum: [entry-level, mid-level, senior-level]
 *
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *           enum: [admin, recruiter, jobSeeker]
 *         fullName:
 *           type: string
 *         profilePic:
 *           type: string
 *         yoe:
 *           type: string
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *
 *     Company:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         logo:
 *           type: string
 */
