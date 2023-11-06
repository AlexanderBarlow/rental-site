import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useMutation } from "@apollo/client";
import { EDIT_PROFILE } from "../utils/mutations";
import Auth from "../utils/auth";
import { QUERY_SESSION_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";


const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [city, setCity] = useState("");
  const [profileImageError, setProfileImageError] = useState("");
  const [backgroundImageError, setBackgroundImageError] = useState("");

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
    const file = e.target.files[0];
    const fileType = file.type.split("/")[0];

    if (fileType !== "image") {
      setProfileImageError("Please select an image file.");
    } else {
      setProfileImageError("");
      setProfileImage(file);
    }
  };

  const handleBackgroundImageChange = (e) => {
    const file = e.target.files[0];
    const fileType = file.type.split("/")[0];

    if (fileType !== "image") {
      setBackgroundImageError("Please select an image file.");
    } else {
      setBackgroundImageError("");
      setBackgroundImage(file);
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (profileImageError || backgroundImageError) {
        console.error("Error: Image files are not valid.");
        return;
      }

    try {
      const { data } = await editProfile({
        variables: {
            profileId: ID,
            username: username || userData.username, // If fields are empty, use existing data
            email: userData.email,
            city: city || userData.city,
            profileImage: profileImage.toString || userData.profileImage,
            backgroundImage: backgroundImage.toString || userData.backgroundImage,
        },
      });

      console.log("Updated Profile Data:", data.editProfile);
      window.location.replace(`/profile/${ID}`);
    } catch (error) {
      console.error("Error updating profile:", error);
      console.log(profileImage);
    }
  };

  return (
    <div  style={{
        height: "100vh",
        width: "100%",
        background: "#051923",
        margin: "0",
        paddingTop: "20px",
      }}>
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
            <Typography variant="subtitle1" component="div">
              Profile Image
              <input
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
              />
              {profileImageError && <span>{profileImageError}</span>}
            </Typography>
          </Box>
          <Box sx={{ mb: 2, background: '#FFF' }}>
            <Typography variant="subtitle1" component="div">
              Background Image
              <input
                type="file"
                accept="image/*"
                onChange={handleBackgroundImageChange}
              />
              {backgroundImageError && <span>{backgroundImageError}</span>}
            </Typography>
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
