import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useMutation } from "@apollo/client";
import { EDIT_PROFILE } from "../utils/mutations";
import Auth from "../utils/auth";
import { QUERY_SESSION_USER } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { storage } from "../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const styles = {
  hidden : {
    display: "none"
  }
}

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState();
  const [backgroundImage, setBackgroundImage] = useState("");
  const [city, setCity] = useState("");

  const [editProfile, { data }] = useMutation(EDIT_PROFILE);

  const user = Auth.getProfile();
  const ID = user.data._id;

  const {
    data: userdata,
    loading,
    error,
  } = useQuery(QUERY_SESSION_USER, {
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

  const uploadImage = async (image, imageType, ID) => {
    if (image == null) {
      return null;
    }

    const imageRef = ref(storage, `images/${image.name + ID}`);
    await uploadBytes(imageRef, image);

    // Get the download URL for the uploaded file
    const imageUrl = await getDownloadURL(imageRef);

    console.log(`Uploaded ${imageType} image!`);
    alert(`Uploaded ${imageType} image!`);

    return imageUrl;
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const profileImageUrl = await uploadImage(profileImage, "profile", ID);
      const backgroundImageUrl = await uploadImage(
        backgroundImage,
        "background",
        ID
      );

      const { data } = await editProfile({
        variables: {
          profileId: ID,
          username: username || userData.username,
          email: userData.email,
          city: city || userData.city,
          profileImage: profileImageUrl || userData.profileImage || "",
          backgroundImage: backgroundImageUrl || userData.backgroundImage || "",
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
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "#FFF" }}
          >
            Edit Profile
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2, background: "#FFF" }}>
              <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={handleUsernameChange}
                fullWidth
              />
            </Box>
            <Box sx={{ mb: 2, background: "#FFF" }}>
              <TextField
                label="City"
                variant="outlined"
                value={city}
                onChange={handleCityChange}
                fullWidth
              />
            </Box>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Box sx={{ mb: 2, ...styles.centered, marginRight: "2%" }}>
                <label htmlFor="profileImageInput">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    sx={{ mt: 2 }}
                  >
                    Upload Profile Image
                    <UploadFileIcon />
                  </Button>
                </label>
                <input
                  id="profileImageInput"
                  style={styles.hidden}
                  type="file"
                  onChange={(e) => {
                    setProfileImage(e.target.files[0]);
                  }}
                />
              </Box>

              <Box sx={{ mb: 2, ...styles.centered }}>
                <label htmlFor="backgroundImageInput">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    sx={{ mt: 2 }}
                  >
                    Upload Background Image <UploadFileIcon />
                  </Button>
                </label>
                <input
                  id="backgroundImageInput"
                  style={styles.hidden}
                  type="file"
                  onChange={(e) => {
                    setBackgroundImage(e.target.files[0]);
                  }}
                />
              </Box>
            </div>
            <Box
              sx={{
                ...styles.centered,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default EditProfile;
