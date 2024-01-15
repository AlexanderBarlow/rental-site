import * as React from "react";
import "materialize-css/dist/css/materialize.min.css";
import ProfilePageMain from "../components/Profile/Profile";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "@mui/material/styles";

const styles = {
  height: {
    height: "100%",
    padding: "2px",
    background: "#006494",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    width: "100%",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default function ProfilePage() {
  const theme = createTheme();

  // Function to generate styles based on medium breakpoints (md)
  const mediumScreenStyles = theme.breakpoints.up("md");

  const dynamicStyles = {
    ...(mediumScreenStyles && {
      height: "100%",
      width: "100%",
      background: "#006494",
    }),
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={dynamicStyles}>
        <ProfilePageMain />
      </div>
    </ThemeProvider>
  );
}
