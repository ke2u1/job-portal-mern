import Marquee from "react-fast-marquee";
import Icon from "./Icon";
import {
  Google,
  Meta,
  Microsoft,
  Amazon,
  Netflix,
  Apple,
  Tesla,
  Ion,
  Coin,
} from "@/constants/compnayIcons";

const MarqueeIcons = () => {
  const rowOne = [Google, Meta, Microsoft, Google, Meta, Microsoft];

  const rowTwo = [Amazon, Netflix, Apple, Amazon, Netflix, Apple];

  const rowThree = [Tesla, Ion, Coin, Tesla, Ion, Coin];

  return (
    <>
      <Marquee>
        <div className="!my-auto grid grid-cols-6 last:mr-8 lg:mb-4 gap-x-7 md:gap-[50px] md:last:mr-[39px]">
          {rowOne.map((item, index) => (
            <Icon key={index} src={item} />
          ))}
        </div>
      </Marquee>
      <Marquee direction="right">
        <div className="!my-auto grid grid-cols-6 last:mr-8 lg:mb-4 gap-x-7 md:gap-[50px] md:last:mr-[39px]">
          {rowTwo.map((item, index) => (
            <Icon key={index} src={item} />
          ))}
        </div>
      </Marquee>
      <Marquee>
        <div className="!my-auto grid grid-cols-6 last:mr-8 lg:mb-4 gap-x-7 md:gap-[50px] md:last:mr-[39px]">
          {rowThree.map((item, index) => (
            <Icon key={index} src={item} />
          ))}
        </div>
      </Marquee>
    </>
  );
};

export default MarqueeIcons;
