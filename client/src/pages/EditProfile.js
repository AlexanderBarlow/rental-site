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
  hidden: {
    display: "none",
  },
};

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [city, setCity] = useState("");
  const [profileImageStatus, setProfileImageStatus] = useState("blue");
  const [backgroundImageStatus, setBackgroundImageStatus] = useState("blue");

  const [editProfile] = useMutation(EDIT_PROFILE);

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

  const isValidFileType = (file) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    return allowedTypes.includes(file.type);
  };

  const handleProfileImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && isValidFileType(selectedFile)) {
      setProfileImage(selectedFile);
      setProfileImageStatus("green");
    } else {
      setProfileImage(null);
      setProfileImageStatus("red");
      alert("Please select a valid PNG or JPG image for profile.");
    }
  };

  const handleBackgroundImageChange = (e) => {
    const File = e.target.files[0];
    if (File && isValidFileType(File)) {
      setBackgroundImage(File);
      setBackgroundImageStatus("green");
    } else {
      setBackgroundImage(null);
      setBackgroundImageStatus("red");
      alert("Please select a valid PNG or JPG image for background.");
    }
  };

  const uploadImage = async (image, imageType, ID) => {
    if (image == null) {
      return null;
    }

    const imageRef = ref(storage, `images/${image.name + ID}`);
    await uploadBytes(imageRef, image);

    // Get the download URL for the uploaded file
    const imageUrl = await getDownloadURL(imageRef);

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
      alert("Profile Update Successfully")
      window.location.replace(`/profile/${ID}`);
    } catch (error) {
      if (error.message.includes("E11000 duplicate key error")) {
        alert("Username is already taken. Please choose a different username.");
        setUsername("");
      } else {
        console.error("Error updating profile:", error);
      }
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
                    sx={{
                      mt: 2,
                      backgroundColor:
                        profileImageStatus === "green"
                          ? "green"
                          : profileImageStatus === "red"
                          ? "red"
                          : "primary",
                    }}
                  >
                    Upload Profile Image
                    <UploadFileIcon />
                  </Button>
                </label>
                <input
                  id="profileImageInput"
                  style={styles.hidden}
                  type="file"
                  onChange={handleProfileImageChange}
                />
              </Box>

              <Box sx={{ mb: 2, ...styles.centered }}>
                <label htmlFor="backgroundImageInput">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    sx={{
                      mt: 2,
                      backgroundColor:
                        backgroundImageStatus === "green"
                          ? "green"
                          : backgroundImageStatus === "red"
                          ? "red"
                          : "primary",
                    }}
                  >
                    Upload Background Image <UploadFileIcon />
                  </Button>
                </label>
                <input
                  id="backgroundImageInput"
                  style={styles.hidden}
                  type="file"
                  onChange={handleBackgroundImageChange}
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
