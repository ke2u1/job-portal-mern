# Table of Contents

- [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Recruiter \[Features and Previews\]](#recruiter-features-and-previews)
  - [Job Seeker \[Features and Previews\]](#job-seeker-features-and-previews)
  - [Project References](#project-references)
    - [Running the Project](#running-the-project)
    - [Contributing](#contributing)
    - [License](#license)

## Project Overview

This project is a MERN stack application, utilizing MongoDB, Express.js, React, and Node.js. The project is structured with a `backend` and `client` directory, each containing their respective components and functionalities.

### Backend

The backend is located in the `backend` directory. It is responsible for:

- **API endpoints:** Defining the API routes and handling requests.
- **Database interactions:** Connecting to the MongoDB database and performing CRUD operations.
- **Authentication:** Handling user login and registration.
- **Data validation:** Ensuring that data is valid before it is stored in the database.

### Frontend

The frontend is located in the `client` directory. It is responsible for:

- **User interface:** Building the user interface using React components.
- **Data fetching:** Making API requests to the backend to retrieve data.
- **State management:** Managing the application state using React hooks.
- **Routing:** Handling navigation between different pages.

## Recruiter [Features and Previews]

- **Create jobs from different companies.**
  ![Screenshot 1: Creating a Job](./screenshots/recruiter/recruiter-create-job.png)
- **Recruiter dashboard (recent applicants, recent jobs, status data in number).**
  ![Screenshot 1: Recruiter Dashboard](./screenshots/recruiter/recruiter-dashboard.png)
- **Check candidate's resume using inbuilt resume.**
  ![Screenshot 3: Viewing Applicants](./screenshots/recruiter/recruiter-view-applicant-resume.png)
- **View applicants in each jobs.**
  ![Screenshot 3: Viewing Applicants](./screenshots/recruiter/recruiter-view-applicants.png)
- **Update candidate status (interviewing, hired, applied, reviewing).**
  ![Screenshot 4: Updating Candidate Status](./screenshots/recruiter/recruiter-update-status.png)
- **Invite user using codes.**
  ![Screenshot 5: Inviting Users](./screenshots/recruiter/recruiter-invite-users.png)

## Job Seeker [Features and Previews]

- **Infinite joblist scroll, JobFilters mobile responsiveness, Apply and view jobs.**  
  ![Screenshot 1: Job Listing](./screenshots/jobSeeker/job-seeker-job-listing.png)
- **Bookmarked job.**
  ![Screenshot 1: Job Listing](./screenshots/jobSeeker/job-seeker-bookmarkedJobs.png)
- **View applied job**
  ![Screenshot 3: Applying for a Job](./screenshots/jobSeeker/job-seeker-applied-job.png)
- **Job Details Drawer**
  ![Screenshot 2: Job Details](./screenshots/jobSeeker/job-seeker-job-details.png)
- **Resume builder using data inputs.**
  ![Screenshot 4: Resume Builder](./screenshots/jobSeeker/job-seeker-resume-builder.png)

## Project References

- **[[Inspiration for Job listings](https://dribbble.com/shots/21587286-Job-Search-Platform)]**
  ![Screenshot 1: Dribbble Design](https://cdn.dribbble.com/userupload/7381601/file/original-c56e86447d5486885da6d6297ca1043b.png?resize=1024x768kk)
- **[Recruiter Dashboard]**
  ![Screenshot 1: Behance Design](./screenshots/Recruiter_Dashboard.png)
- **[Candidate Status]**
  ![Screenshot 1: Behance Design](./screenshots/Candidate_Status.png)
- **[Job Details Drawer]**
  ![Screenshot 1: Behance Design](./screenshots/Job_Details_Drawer.png)

### Running the Project

To run the project, follow these steps:

1. **Install dependencies:**

   ```bash
   cd backend
   npm install
   cd ../client
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cd backend
   cp .env.example .env
   cd ../client
   cp .env.example .env
   ```

3. **Start the backend server:**

   ```bash
   cd backend
   npm start
   ```

4. **Start the frontend development server:**
   ```bash
   cd client
   npm run dev
   ```

The frontend will be accessible at `http://localhost:3000`.
The backend will be accessible at `http://localhost:8000`.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request.

### License

This project is licensed under the MIT License.
