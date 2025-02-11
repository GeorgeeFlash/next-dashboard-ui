import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import prisma from "@/lib/prisma";
import { userInfo } from "@/lib/utils";
import React from "react";

import "react-big-calendar/lib/css/react-big-calendar.css";

const ParentPage = async () => {
  const { currentUserId } = await userInfo();

  const students = await prisma.student.findMany({
    where: {
      parentId: currentUserId,
    },
  });
  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="">
        {students.map((student) => (
          <div key={student.id} className="w-full xl:w-2/3">
            <div className="h-full bg-white p-4 rounded-md">
              <h1 className="text-xl font-semibold">
                Schedule ({student.name + " " + student.surname})
              </h1>
              <BigCalendarContainer type="classId" id={student.classId} />
            </div>
          </div>
        ))}
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default ParentPage;
