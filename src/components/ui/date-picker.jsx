import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker as MuiDateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const DateTimePicker = ({ showTime, ...args }) => {
  const views = showTime
    ? ["day", "hours", "minutes", "month", "seconds", "year"]
    : ["year", "month", "day"];

  return (
    <MuiDateTimePicker
      views={views}
      slotProps={{
        textField: { variant: "standard", fullWidth: true },
      }}
      {...args}
    />
  );
};

export { DatePicker, DateTimePicker };
