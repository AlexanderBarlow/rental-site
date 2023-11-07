import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useMutation } from "@apollo/client";
import { EDIT_PROFILE } from "../utils/mutations";
import Auth from "../utils/auth";
import { QUERY_SESSION_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import axios from "axios";


const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [city, setCity] = useState("");

  const [editProfile, { data }] = useMutation(EDIT_PROFILE);

  const user = Auth.getProfile();
  const ID = user.data._id;

  const { data:userdata, loading, error } = useQuery(QUERY_SESSION_USER, {
    variables: { profileId: ID },
  });
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userdata && userdata.profile) {
      setUserData(userdata.profile);
    }
  }, [userdata]);
  console.log(userData);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.value);
  };

  const handleBackgroundImageChange = (e) => {
    setBackgroundImage(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await editProfile({
        variables: {
            profileId: ID,
            username: username || userData.username, // If fields are empty, use existing data
            email: userData.email,
            city: city || userData.city,
            profileImage: profileImage || userData.profileImage,
            backgroundImage: backgroundImage || userData.backgroundImage,
        },
      });

      console.log("Updated Profile Data:", data.editProfile);
      window.location.replace(`/profile/${ID}`);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        background: "#051923",
        margin: "0",
        paddingTop: "20px",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{color: "#FFF"}}>
            Edit Profile
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2, background: '#FFF' }}>
              <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={handleUsernameChange}
                fullWidth
              />
            </Box>
            <Box sx={{ mb: 2, background: '#FFF' }}>
              <TextField
                label="Profile Image URL"
                variant="outlined"
                value={profileImage}
                onChange={handleProfileImageChange}
                fullWidth
              />
            </Box>
            <Box sx={{ mb: 2, background: '#FFF' }}>
              <TextField
                label="Background Image URL"
                variant="outlined"
                value={backgroundImage}
                onChange={handleBackgroundImageChange}
                fullWidth
              />
            </Box>
            <Box sx={{ mb: 2, background: '#FFF' }}>
              <TextField
                label="City"
                variant="outlined"
                value={city}
                onChange={handleCityChange}
                fullWidth
              />
            </Box>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default EditProfile;