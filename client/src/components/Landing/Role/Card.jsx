import PropTypes from "prop-types";
import { motion } from "framer-motion";
import TextAnimation from "../../TextAnimation";

const Card = ({ iconBg, src, title, paragraph, titleColor, delay }) => (
  <motion.div className="relative shrink-0  flex flex-col border border-[#D9D9D9] md:h-[460px] items-center justify-start shadow-xl w-full md:w-[375px] rounded-[20px]">
    <div
      className={`relative flex items-baseline justify-center max-h-[197px] ${iconBg} w-full h-[196px] rounded-t-[20px] flex`}
    >
      <img
        height={250}
        width={250}
        alt={`title ${title}`}
        src={src}
        className="relative -translate-y-8 align-middle h-[230px] max-w-[250px]"
      />
    </div>
    <div className="px-7 py-9 md:py-0 md:pt-8 ">
      <TextAnimation delay={delay / 4}>
        <h3
          className={`font-grotesk text-2xl mb-2 md:mb-[18px] font-bold md:text-[1.75rem] leading-[34.72px] ${titleColor}`}
        >
          {title}
        </h3>
      </TextAnimation>
      <TextAnimation delay={delay}>
        <p className="text-[1.125rem] leading-8 text-default font-normal !font-inter">
          {paragraph}
        </p>
      </TextAnimation>
    </div>
  </motion.div>
);

Card.propTypes = {
  iconBg: PropTypes.string,
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  paragraph: PropTypes.string.isRequired,
  titleColor: PropTypes.string,
  delay: PropTypes.number,
};

export default Card;
