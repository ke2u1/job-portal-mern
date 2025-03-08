import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, Mail, Phone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Resume from "../../common/Resume";
import { useState } from "react";

const UserInfoDialog = ({ userId, open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{selectedApplicant?.name}</DialogTitle>
          <DialogDescription>
            {selectedApplicant?.appliedFor} at {selectedApplicant?.company}
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="profile" className="mt-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="coverLetter">Cover Letter</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={selectedApplicant?.avatar}
                    alt={selectedApplicant?.name}
                  />
                  <AvatarFallback>
                    {selectedApplicant?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">
                    {selectedApplicant?.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedApplicant?.appliedFor}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedApplicant?.location}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">{selectedApplicant?.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm">{selectedApplicant?.phone}</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedApplicant?.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="resume">
            <div className="space-y-4">
              <Resume user={applicant} />
              <Button>
                <Download className="mr-2 h-4 w-4" /> Download Resume
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="coverLetter">
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {selectedApplicant?.coverLetter}
            </p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default UserInfoDialog;
