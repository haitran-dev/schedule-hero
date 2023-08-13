import dayjs from "dayjs";
import * as React from "react";
import { Calendar as BigCalendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = dayjsLocalizer(dayjs);

const Calendar = (props) => {
  const eventPropGetter = React.useCallback(() => {
    let style = {
      borderColor: "white",
    };

    return {
      style,
    };
  }, []);

  return (
    <BigCalendar
      localizer={localizer}
      step={30}
      views={["month", "week", "day"]}
      defaultView="week"
      eventPropGetter={eventPropGetter}
      {...props}
    />
  );
};

export default Calendar;
