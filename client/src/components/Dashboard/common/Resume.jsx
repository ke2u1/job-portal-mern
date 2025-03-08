import { Badge } from "@/components/ui/badge";
import Container from "./Container";
import Loader from "./Loader";
import PropTypes from "prop-types";
import { memo } from "react";
import moment from "moment";
import { cn } from "@/lib/utils";

import {
  CircleUserRoundIcon,
  BriefcaseBusiness,
  GitBranch,
  FolderOpen,
  GraduationCap,
  Linkedin,
  Github,
} from "lucide-react";
import { fetchUserById } from "@/services/userServices";
import { useQuery } from "@tanstack/react-query";

const Resume = ({ user, userId, className }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["candidate", userId],
    queryFn: () => fetchUserById(userId),
    enabled: !user && !!userId,
    // Only run the query if user is not provided and userId is available
    cacheTime: 1000 * 60 * 5, // Cache for 5 minutes
    staleTime: 1000 * 60 * 100, // Data is fresh for 2 minutes
  });

  const resumeData = user || data?.user;

  if (isLoading) {
    return (
      <div
        className={`min-w-96 border-none border-0 my-0 bg-background px-6 w-96`}
      >
        <Loader />
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div
        className={`min-w-96 border-none border-0 my-0 min-h-full p-3 item-center rounded-3xl bg-background px-6 w-96`}
      >
        <p className="text-center text-xl font-bold">
          No user data available! Select a candidate to render the Resume
        </p>
      </div>
    );
  }

  const {
    fullName,
    bio,
    skills,
    projects,
    experience,
    education,
    profilePic,
    designation,
    profileLinks,
  } = resumeData;

  return (
    <Container
      className={cn(
        `min-w-96 w-full relative h-full font-inter border my-0 bg-background overflow-y-auto max-h-full py-12 px-10 `,
        className
      )}
    >
      {/* Basic Info */}
      <section className="pb-4">
        <div className="flex flex-row h-28 gap-2">
          <div className="relative h-full flex items-center justify-center">
            <img
              src={profilePic || "https://via.placeholder.com/150"}
              alt="profile"
              className="rounded-full min-w-20 h-20 bg-black object-cover"
            />
          </div>

          <div className="flex flex-col border-y-2 text-center text-sm col-span-3">
            <div className="flex flex-row flex-wrap leading-none">
              <p className="text-lg font-bold">{fullName},</p>
              <p>{designation}</p>
            </div>
            {profileLinks && (
              <div className="flex mt-2 flex-col flex-wrap gap-1">
                {Object.entries(profileLinks).map(([key, value]) => (
                  <a
                    key={key}
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary"
                  >
                    {key === "linkedIn" && <Linkedin className="h-4 w-4" />}
                    {key === "github" && <Github className="h-4 w-4" />}
                    {value}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="pb-4">
        <h2 className="text-lg flex items-center border-black border-b-2 py-1 font-bold">
          <CircleUserRoundIcon className="h-5 w-5 mr-2" />
          <span>Profile</span>
        </h2>
        <p className="text-center text-sm mt-2">{bio}</p>
      </section>

      {/* Skills Section */}
      <section className="pb-4">
        <h2 className="text-lg flex items-center border-black border-b-2 py-1 font-bold">
          <GitBranch className="h-5 w-5 mr-2" />
          Skills
        </h2>
        <ul className="mt-2 items-center flex flex-row justify-stretch flex-wrap gap-1">
          {skills
            ?.join(", ")
            ?.split(", ")
            ?.map((skill, index) => (
              <li key={index}>
                <Badge className="w-fit">{skill}</Badge>
              </li>
            ))}
        </ul>
      </section>

      {/* Projects */}
      <section className="relative pb-4">
        <h2 className="text-lg flex items-center border-black border-b-2 py-1 font-bold">
          <FolderOpen className="h-5 w-5 fill-black stroke-white mr-2" />
          Projects
        </h2>
        <ul className="mt-2 max-w-96 relative text-sm space-y-2">
          {projects?.map((project, index) => (
            <li key={index} className="relative">
              <div className="flex flex-row">
                <div className="flex flex-row ">
                  <h3 className="font-semibold text-nowrap mr-1">
                    {project?.title},
                    <span className="font-normal text-gray-500 text-wrap text-sm italic ">
                      {" "}
                      {project?.skills?.join(", ")}
                    </span>
                  </h3>
                </div>
                <p className="absolute right-0">
                  {moment(project?.endDate).format("MMM YYYY")}
                </p>
              </div>
              <p
                className="bullet_list"
                dangerouslySetInnerHTML={{ __html: project?.description }}
              ></p>
              <a
                href={project?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Project
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Experience Section */}
      <section className="pb-4">
        <h2 className="text-lg flex items-center border-black border-b-2 py-1 font-bold">
          <BriefcaseBusiness className="h-5 w-5 mr-2" />
          Experience
        </h2>
        <ul className="mt-2 relative text-sm space-y-2">
          {experience?.map((exp, index) => (
            <li key={index} className="relative">
              <div className="flex flex-row flex-wrap">
                <p className="font-semibold">{exp?.employer}</p>
                <h3 className="italic">{exp?.jobTitle}</h3>
                <p className="absolute right-0">
                  {moment(exp?.startDate).format("MMM YYYY")} -{" "}
                  {moment(exp?.endDate).format("MMM YYYY")}
                </p>
              </div>
              <p
                className="bullet_list"
                dangerouslySetInnerHTML={{ __html: exp?.description }}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* Education Section */}
      <section className="pb-4">
        <h2 className="text-lg flex items-center border-black border-b-2 py-1 font-bold">
          <GraduationCap className="h-5 w-5 mr-2" />
          Education
        </h2>
        {education?.map((edu, index) => (
          <div key={index} className="relative text-sm flex flex-row mt-2">
            <p className="font-semibold  mr-2">{edu?.degree},</p>
            <h3 className="italic"> {edu?.institution}</h3>
            <p className="absolute right-0">{edu?.yearOfGraduation}</p>
          </div>
        ))}
      </section>
    </Container>
  );
};

Resume.propTypes = {
  className: PropTypes.string,
  userId: PropTypes.string,
  user: PropTypes.shape({
    profilePic: PropTypes.string,
    designation: PropTypes.string,
    fullName: PropTypes.string,
    bio: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    profileLinks: PropTypes.shape({
      github: PropTypes.string,
      linkedIn: PropTypes.string,
    }),
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        skills: PropTypes.arrayOf(PropTypes.string),
        endDate: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    experience: PropTypes.arrayOf(
      PropTypes.shape({
        yoe: PropTypes.string,
        jobTitle: PropTypes.string,
        employer: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        description: PropTypes.string,
      })
    ),
    education: PropTypes.arrayOf(
      PropTypes.shape({
        institution: PropTypes.string,
        degree: PropTypes.string,
        yearOfGraduation: PropTypes.string,
      })
    ),
  }),
};

export default memo(Resume);
