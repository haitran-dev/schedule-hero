import { LocalizationProvider as Provider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const LocalizationProvider = ({ children }) => {
  return <Provider dateAdapter={AdapterDayjs}>{children}</Provider>;
};

export default LocalizationProvider;
