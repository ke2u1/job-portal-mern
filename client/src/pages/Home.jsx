import Achievements from "@/components/Landing/Achievements";
import LogoGrid from "@/components/Landing/LogoGrid";
import UsefulFor from "@/components/Landing/Role";
import ShowcaseSection from "@/components/Landing/ShowcaseSection";

const Home = () => {
  return (
    <>
      <section>
        <LogoGrid />
      </section>
      <section>
        <UsefulFor />
      </section>
      <section>
        <ShowcaseSection />
      </section>
      <section>
        <Achievements />
      </section>
    </>
  );
};

export default Home;
