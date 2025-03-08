import "swiper/css";
import "swiper/css/bundle";

import { Autoplay, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useEffect, useState } from "react";

import Loader from "@/components/Dashboard/common/Loader";

import { achievements } from "@/constants/constants";
import { memo } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Achievements = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isMobile = useMediaQuery("(max-width: 718px)");

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prevTab) => (prevTab + 1) % 4);
      // Adjust the number of tabs accordingly
    }, 2000); // Switch tabs every 2 seconds

    return () => clearInterval(interval); //
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl pt-[88px] lg:max-h-[720px] pb-11 lg:pt-[64px] lg:pb-[140px] relative overflow-hidden font-grotesk lg:overflow-visible">
      <div className="px-[1.87rem] mb-10 lg:mb-[4.8rem] relative z-2">
        <div className="lg:mx-[-0.7rem] flex-row flex-wrap">
          <h2 className="text-center heading-m text-[2.5rem] font-bold  text-heading tracking-[-.01em] leading-none">
            Numbers we are proud of
          </h2>
        </div>
      </div>

      <div className="lg:px-[1.875rem] mx-auto z-[2] relative">
        {/* Achievements for mobile */}
        {isMobile ? (
          <div className="lg:hidden shadow-sm">
            <Swiper
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, EffectFade]}
              slidesPerView={1}
            >
              {achievements.achievement.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="md:rounded-[20px] rounded-2xl lg:flex lg:items-center mx-4 px-2 border lg:justify-center bg-light h-[250px]">
                    <p className="text-heading flex h-full items-center justify-center py-6 px-12 tracking-[-0.005em] text-center flex-col">
                      <span className="font-extrabold text-6xl block leading-none md:text-[8rem] text-center">
                        {item.name}
                      </span>
                      <span className="block text-3xl font-bold md:text-[2.25rem]">
                        {item.target}
                      </span>
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <TabGroup onChange={setSelectedIndex} selectedIndex={selectedIndex}>
            <div className="flex mx-auto">
              <TabList
                as="div"
                className="flex mx-auto shadow-2xl bg-light sm:w-[350px] md:w-[400px] h-[380px] min-h-[380px] border flex-col rounded-[20px] space-y-[30px] sm:px-4 lg:px-7 justify-center text-heading"
              >
                {achievements.name.map((item, index) => (
                  <Tab
                    key={index}
                    className={({ selected }) =>
                      classNames(
                        "focus:outline-none max-h-[60px] min-w-max h-16 text-left relative flex flex-row items-center group justify-start px-5 py-4 rounded-[1.25rem] group border border-[#D9D9D9] font-semibold",
                        selected
                          ? "bg-muave text-white"
                          : "bg-light text-muave hover:bg-muave/10"
                      )
                    }
                  >
                    <Loader
                      size={27}
                      className={
                        "ui-not-selected:hidden ui-selected:block group-focus:transition-all duration-1000"
                      }
                    />

                    <motion.span className="leading-none text-heading ui-selected:text-light ui-selected:translate-x-[2.5rem] duration-1000 group-focus:transition-all font-medium text-[25px] pointer-events-none block tracking-[-0.005em] pl-2">
                      {item}
                    </motion.span>
                  </Tab>
                ))}
              </TabList>

              <TabPanels
                as="div"
                className={
                  "sm:w-[300px] mx-4 md:w-[480px] lg:w-[680px] md:max-w-full max-w-xs md:h-[380px] lg:ml-16 md:order-1 lg:order-none"
                }
              >
                {achievements.achievement.map((item, index) => (
                  <TabPanel
                    key={index}
                    className="md:rounded-[20px] rounded-2xl lg:flex lg:items-center h-full lg:min-w-[320px] px-2 w-full lg:justify-center lg:shadow-2xl border bg-light"
                  >
                    <p className="text-heading flex h-full items-center justify-center py-6 lg:px-12 w-full tracking-[-0.005em] text-center flex-col">
                      <span className="font-extrabold block leading-[159.72px] sm:text-[4rem] md:text-[8rem] text-center">
                        {item.name}
                      </span>
                      <span className="block font-bold sm:text-[1.125rem] md:text-[2.25rem]">
                        {item.target}
                      </span>
                    </p>
                  </TabPanel>
                ))}
              </TabPanels>
            </div>
          </TabGroup>
        )}
      </div>
    </div>
  );
};

export default memo(Achievements);
