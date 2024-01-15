import * as React from "react";
import "materialize-css/dist/css/materialize.min.css";
import ProfilePageMain from "../components/Profile/Profile";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

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
