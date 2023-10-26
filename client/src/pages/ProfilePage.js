import * as React from "react";
import "materialize-css/dist/css/materialize.min.css";
import ProfilePageMain from "../components/Profile/Profile";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { borderRadius, width } from "@mui/system";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme

const styles = {
  height: {
    height: "100%",
    padding: "2px",
    background: "#006494",
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    fontSize: "1.25rem", 
    fontWeight: "700", 
    color: "#00A6FB",
    background: "#051923",
  },
}



export default function ProfilePage() {

  const theme  = useTheme()

  const largeScreenStyles = {
    [theme.breakpoints.up("lg")]: {
      height: "100vh",
      widthL: "100vw",
    },
  };

  return (
    <div style={{ ...styles.height, ...largeScreenStyles }}>
      <ProfilePageMain />
    </div>
  );
}
