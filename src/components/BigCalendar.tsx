"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import { useState } from "react";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const BigCalendar = ({
  data,
}: {
  data: { title: string; start: Date; end: Date }[];
}) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };
  

  return (
    <Calendar
      localizer={localizer}
      events={data}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      onView={handleOnChangeView}
      style={{ height: "98%" }}
      min={new Date(2025, 2, 0, 8, 0, 0)} // The important thing here is the hour
      max={new Date(2025, 2, 0, 17, 0, 0)}
    />
  );
};

export default BigCalendar;
