import * as React from "react";
import Schedule from "./components/Schedule";
import LocalizationProvider from "./components/provider/LocalizationProvider";
import SignInForm from "./components/SignInForm";
import { isAuthenticated, logout } from "./helper/authentication";
import Button from "@mui/material/Button";

function App() {
  if (!isAuthenticated()) return <SignInForm />;

  return (
    <>
      <LocalizationProvider>
        <div className="h-[95vh] p-10 space-y-5">
          <div className="flex justify-end">
            <Button onClick={logout} type="submit" variant="contained">
              Sign out
            </Button>
          </div>
          <Schedule />
        </div>
      </LocalizationProvider>
    </>
  );
}

export default App;
