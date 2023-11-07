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
  const [profileImage, setProfileImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [city, setCity] = useState("");
  const [profileImageError, setProfileImageError] = useState("");
  const [backgroundImageError, setBackgroundImageError] = useState("");
  const [ file, setFile ] = useState(null);

  const [editProfile] = useMutation(EDIT_PROFILE);

  const user = Auth.getProfile();
  const ID = user.data._id;

  const { data: userdata, loading, error } = useQuery(QUERY_SESSION_USER, {
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

  const fileSelectedHandler = (event) => {
    setFile({
      selectedFile: event.target.files[0],
    })
    console.log(event.target.files[0])
  }

  const fileUploadHandler = () => {
  const fd = new FormData();
  fd.append('image', file, file.selectedFile.name);
  axios.post('/subscriptions/8afadd42-dc7d-4997-a957-e837e54d44ba/resourceGroups/images/providers/Microsoft.Storage/storageAccounts/nesteaseimages/fileServices/default', fd)
  .then(res => {
    console.log(res);
  })
}

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };
  
  const handleBackgroundImageChange = (e) => {
    const file = e.target.files[0];
    setBackgroundImage(file);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('profileId', ID);
    formData.append('username', username || userData.username);
    formData.append('email', userData.email);
    formData.append('city', city || userData.city);
  
    try {
      const { data } = await editProfile({
        variables: formData,
      });
  
      console.log('Updated Profile Data:', data.editProfile);
      window.location.replace(`/profile/${ID}`);
    } catch (error) {
      console.error('Error updating profile:', error);
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
                onChange={fileSelectedHandler}
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
                onChange={fileSelectedHandler}
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
          <Button type="submit" variant="contained" color="primary" onSubmit={fileUploadHandler}>
            Save
          </Button>
        </form>
      </Box>
    </Container>
  </div>
  );
};


export default EditProfile;
