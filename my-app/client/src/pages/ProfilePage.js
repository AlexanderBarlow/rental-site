import React from "react";
import ProfileContactCard from "../components/Profile/ProfileContactCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ProfilePage.css";

export default function ProfilePage() {
  return (
    <div>
      <Navbar />
      <ProfileContactCard />
      <Footer />
    </div>
  );
}
