import * as React from "react";
import "materialize-css/dist/css/materialize.min.css";
import ProfilePageMain from "../components/Profile/Profile";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { borderRadius, width } from "@mui/system";



const styles = {
  height: {
    height: "100%",
    padding: "2px",
  },
  btn: {
    fontSize: "1.25rem", 
    fontWeight: "700", 
    color: "#00A6FB",
    background: "#051923",
  },
}

export default function ProfilePage() {
  return (
    <div style={styles.height}>
      <ProfilePageMain />
      <Link  to="/addproduct">
        <Button variant="contained" style={styles.btn} className="glow">
          Add your Product!
        </Button>
      </Link>
    </div>
  );
}
