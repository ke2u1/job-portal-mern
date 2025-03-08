import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual, Autoplay, EffectFade } from "swiper";
import "./swiper.css";

import "swiper/css";
import "swiper/css/autoplay";

const items = [
  "Remote Jobs",
  "Tech Careers",
  "Startups",
  "Opportunities",
  "Freelance",
  "Full-Time Roles",
  "Part-Time Roles",
  "SWE",
  "Design",
  "Data Science",
  "Human Resources",
  "Customer Support",
];

const VerticleSlider = () => {
  return (
    <Swiper
      loop
      autoplay={{
        delay: 1000, // Autoplay delay in milliseconds
        disableOnInteraction: false, // Autoplay continues even when user interacts with swiper}
      }}
      modules={[Virtual, Autoplay, EffectFade]}
      direction="vertical"
      loopPreventsSliding
      noSwiping
      slidesPerView={6}
      breakpoints={{
        640: {
          slidesPerView: 8,
          spaceBetween: 20,
        },

        1024: {
          slidesPerView: 6,
          spaceBetween: 50,
        },
      }}
    >
      {items.map((item, index) => (
        <SwiperSlide className="" virtualIndex={index} key={index}>
          {({ isActive, isNext /* isPrev */ }) => (
            <span
              className={`transition-all whitespace-normal duration-500  leading-none text-6xl md:text-6xl lg:text-9xl z-10 opacity-25 ${
                (isActive && " !text-white bg-black ",
                isNext && "!opacity-100 md:text-5xl lg:!text-[135px]")
              }`}
            >
              {item}
            </span>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default VerticleSlider;
