import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BookOpen } from "lucide-react";
import Container from "../../common/Container";
import PersonalInfo from "./PersonalInfo";
import ProfessionalDetails from "./ProfessionalDetails";
import { UserRoundPen } from "lucide-react";

const Profile = () => {
  return (
    <Tabs
      defaultValue="personal-details"
      className="px-1 lg:px-4 mx-auto w-full h-full max-h-[calc(100vh-19vh)]"
    >
      <TabsList className="">
        <TabsTrigger
          className="flex text-background gap-2"
          value="personal-details"
        >
          <UserRoundPen size={20} />
          <span className="">Personal Infomation</span>
        </TabsTrigger>
        <TabsTrigger
          className="flex text-background gap-2"
          value="professional-details"
        >
          <BookOpen size={20} />
          Professional Details
        </TabsTrigger>
      </TabsList>
      <Container
        className={`max-w-screen-2xl overflow-auto capitalize font-semibold w-full px-2 lg:px-6 lg:mx-2 max-h-full min-h-full bg-background lg:py-12`}
      >
        <TabsContent value="personal-details">
          <PersonalInfo />
        </TabsContent>
        <TabsContent value="professional-details">
          <ProfessionalDetails />
        </TabsContent>
      </Container>
    </Tabs>
  );
};

export default Profile;
