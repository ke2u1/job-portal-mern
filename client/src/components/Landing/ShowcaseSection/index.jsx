import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import VerticleSlider from "./VerticleSlider";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const ShowcaseSection = () => {
  const items = new Array(12).fill("Item ");
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <div className="max-h-[900px] overflow-hidden pb-12 md:px-[3%] bg-[#150f04] w-screen max-w-full">
      <div className="xl:text-[0.7vw] pt-[6.4em] md:pb-[1.6em] text-xs w-full lg:max-w-[128rem] mx-auto">
        <div className="text-[#fff] px-4 text-start md:text-center mb-[2.8em]">
          <div className="uppercase text-base font-medium leading-[1.2]">
            Connecting Talent with Opportunity
          </div>
        </div>

        {/* It will be hidden in larger display */}
        {/* For mobile Devices */}
        {isMobile ? (
          <div className="mobile__wrapper font-grotesk">
            <div className="text-[#ddb15c] leading-none text-7xl px-4 mb-3.5">
              Built for
            </div>
            <div className="flex justify-start">
              <Marquee
                speed={70}
                className="text-5xl odd:!opacity-50 even:!opacity-100  absolute leading-none text-[#ddb15c]"
              >
                <div className="">
                  {items.map((item, index) => (
                    <span key={index} className="mx-1 h-fit">
                      {item}
                    </span>
                  ))}
                </div>
              </Marquee>
            </div>
            <div className="mt-6 items-start">
              <div className="gap-y-[2.4rem] text-[#fff] grid auto-rows-auto grid-cols-none items-end text-[2.4rem] px-4 font-normal leading-[1.7]">
                <div className="text-[1.7rem] leading-[1.6]">
                  Our platform helps you discover the best jobs, connect with
                  top companies, and advance your career— all in one place.
                </div>
                <Link
                  to={"/register"}
                  className=" text-start justify-start grid grid-flow-col items-center text-[16.2px] font-medium group transition-transform duration-700 leading-[1.2] hover:transition-[color_.45s_cubic-bezier(.215,.61,.355,1)] hover:text-[#b18023]"
                >
                  <div>Request Access</div>
                  <div className="w-[1.4rem] flex items-center justify-center">
                    <svg
                      className="group-hover:translate-x-1 duration-700 py-3"
                      width="100%"
                      height="100%"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.524 18.7872C14.524 18.7872 19.025 14.2822 20.779 12.5272C20.925 12.3812 20.998 12.1892 20.998 11.9972C20.998 11.8052 20.925 11.6142 20.779 11.4672C19.026 9.71319 14.524 5.20919 14.524 5.20919C14.38 5.06419 14.19 4.99219 14 4.99219C13.807 4.99219 13.615 5.06619 13.468 5.21319C13.175 5.50519 13.173 5.97919 13.464 6.26919L18.442 11.2472H3.75C3.336 11.2472 3 11.5832 3 11.9972C3 12.4112 3.336 12.7472 3.75 12.7472H18.442L13.463 17.7262C13.174 18.0152 13.177 18.4882 13.469 18.7802C13.617 18.9282 13.81 19.0022 14.002 19.0022C14.192 19.0022 14.38 18.9302 14.524 18.7872Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-scroll hidden sm:block lg:text-[0.7vw]">
            <div className="grid leading-none md:gap-[4.8em] text-[#deb566] auto-cols-[1fr] grid-rows-[1fr] grid-cols-[auto_1fr] row-auto">
              <div className="relative z-10 max-w-[42em] gap-x-[2.4em] gap-y-[3.6em] text-right flex flex-col justify-start items-end">
                <div className="max-w-[5ch] text-[10.4em]">Built for</div>
                <div className="gap-y-[2.4rem] text-[#fff] flex flex-col items-end text-[2.4rem] font-normal leading-[1.7]">
                  <div className="text-[.5em] leading-[1.6]">
                    You’ve built a thriving community. Pallet helps you support
                    their careers, land great new roles, and get paid, all in
                    one product.
                  </div>
                  <Link
                    to={"/register"}
                    className="gap-y-[1rem] text-center justify-center grid grid-flow-col items-center py-[0.4rem] text-[16.2px] font-medium group transition-transform duration-700 leading-[1.2] hover:transition-[color_.45s_cubic-bezier(.215,.61,.355,1)] hover:text-[#b18023]"
                  >
                    <div>Request Access</div>
                    <div className="w-[1.4rem] flex items-center justify-center">
                      <svg
                        className="group-hover:translate-x-1 duration-700 py-3"
                        width="100%"
                        height="100%"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.524 18.7872C14.524 18.7872 19.025 14.2822 20.779 12.5272C20.925 12.3812 20.998 12.1892 20.998 11.9972C20.998 11.8052 20.925 11.6142 20.779 11.4672C19.026 9.71319 14.524 5.20919 14.524 5.20919C14.38 5.06419 14.19 4.99219 14 4.99219C13.807 4.99219 13.615 5.06619 13.468 5.21319C13.175 5.50519 13.173 5.97919 13.464 6.26919L18.442 11.2472H3.75C3.336 11.2472 3 11.5832 3 11.9972C3 12.4112 3.336 12.7472 3.75 12.7472H18.442L13.463 17.7262C13.174 18.0152 13.177 18.4882 13.469 18.7802C13.617 18.9282 13.81 19.0022 14.002 19.0022C14.192 19.0022 14.38 18.9302 14.524 18.7872Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Right-side */}
              <div className="fade-y z-20 relative max-h-[700px] h-[700px] sm:block font-grotesk">
                <VerticleSlider />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowcaseSection;
