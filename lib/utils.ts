import { auth } from "@clerk/nextjs/server";

// Don't use the code in comments It didn't work
// const { sessionClaims, userId } = await auth();
// export const role = (sessionClaims?.metadata as { role?: string })?.role;
// export const currentUserId = userId;

export const userInfo = async () => {
  const user = await auth();
  const { userId, sessionClaims } = user;
  const role = (
    sessionClaims?.metadata as {
      role?: "admin" | "teacher" | "student" | "parent";
    }
  )?.role;

  if (!userId || !role) {
    return (await auth()).redirectToSignIn();
  }

  return { currentUserId: userId, role };
};

const currentWorkWeek = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const startOfWeek = new Date(today);

  if (dayOfWeek === 0) {
    startOfWeek.setDate(today.getDate() + 1);
  }
  if (dayOfWeek === 6) {
    startOfWeek.setDate(today.getDate() + 2);
  } else {
    startOfWeek.setDate(today.getDate() - (dayOfWeek - 1));
  }
  startOfWeek.setHours(0, 0, 0, 0);

  return { startOfWeek };
};

export const adjustScheduleToCurrentWeek = (
  lessons: { title: string; start: Date; end: Date }[]
): { title: string; start: Date; end: Date }[] => {
  const { startOfWeek } = currentWorkWeek();

  return lessons.map((lesson) => {
    const lessonDayOfWeek = lesson.start.getDay();

    const daysFromMonday = lessonDayOfWeek === 0 ? 6 : lessonDayOfWeek - 1;

    const adjustStartDate = new Date(startOfWeek);
    adjustStartDate.setDate(startOfWeek.getDate() + daysFromMonday);
    adjustStartDate.setHours(
      lesson.start.getHours(),
      lesson.start.getMinutes(),
      lesson.start.getSeconds()
    );

    const adjustEndDate = new Date(adjustStartDate);
    adjustEndDate.setHours(
      lesson.end.getHours(),
      lesson.end.getMinutes(),
      lesson.end.getSeconds()
    );

    return {
      title: lesson.title,
      start: adjustStartDate,
      end: adjustEndDate,
    };
  });
};
