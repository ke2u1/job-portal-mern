import Card from "./Card";

const cardData = [
  {
    iconBg: "bg-[#D1FADF]",
    src: "/roles/ForStudents.png",
    title: "For students",
    titleColor: "text-[#0AA482]",
    paragraph:
      "We help candidates showcase their skills and experience to employers as a way to get hired by connecting student experiences to opportunities",
  },
  {
    iconBg: "bg-[#FFEAE0]",
    src: "/roles/ForCompanies.png",
    title: "For companies",
    titleColor: "text-[#FF6E76]",
    paragraph:
      "We partner with employers to help companies discover the untapped talent and redefine the way hiring takes place",
  },
  {
    iconBg: "bg-[#EFEDFF]",
    src: "/roles/ForColleges.png",
    title: "For college/universities",
    titleColor: "text-[#693CF3]",
    paragraph:
      "We collaborate with colleges to transform the educational opportunities and introduce student talents to the industry",
  },
];

const Role = () => {
  return (
    <div className="flex lg:py-12 p-2 mx-auto sm:max-w-xs lg:max-w-screen-xl mb-[80px] gap-y-16 flex-wrap md:gap-x-7 items-center justify-center flex-col lg:flex-row">
      {cardData?.map(({ iconBg, src, title, paragraph, titleColor }, index) => (
        <Card
          key={index}
          delay={index / 4} // control paragraph text animation delay
          paragraph={paragraph}
          iconBg={iconBg}
          title={title}
          src={src}
          titleColor={titleColor}
        />
      ))}
    </div>
  );
};

export default Role;
