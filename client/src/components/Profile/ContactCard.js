import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_SESSION_USER } from "../../utils/queries";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import Avatar from "@mui/material/Avatar";

function MainFeaturedPost(props) {
  const auth = Auth.getProfile();
  const ID = auth.data._id;

  const { data, loading, error } = useQuery(QUERY_SESSION_USER, {
    variables: { profileId: ID },
  });

  const [userData, setUserData] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [backgroundImageUrl, setBackgroundImage] = useState(null);

  const img = {
    image: "https://source.unsplash.com/random",
  };

  useEffect(() => {
    if (data && data.profile) {
      setUserData(data.profile);

      if (data.profile.profileImage) {
        setProfileImageUrl(data.profile.profileImage);
        setBackgroundImage(data.profile.backgroundImage);
      } else {
        setProfileImageUrl(img.image);
      }
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (userData) {
    return (
      <Container sx={{ width: "100%" }}>
        <Paper
          sx={{
            position: "relative",
            backgroundColor: "grey.800",
            color: "#fff",
            mb: 4,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url(${backgroundImageUrl || img.image})`,
          }}
        >
          <Grid
            container
            alignItems="start"
            textAlign="center"
            sx={{
              flexDirection: "column", // Vertical layout
              padding: { xs: 4, sm: 6, md: 8 },
            }}
          >
            <Avatar
              alt="Profile Avatar"
              src={profileImageUrl || img.image}
              sx={{
                width: { xs: 100, sm: 120, md: 150 }, // Adjust the width for different screen sizes
                height: { xs: 100, sm: 120, md: 150 }, // Adjust the height accordingly
                marginBottom: 2,
              }}
            />
            <Typography
              component="div"
              variant="h3"
              color="inherit"
              gutterBottom
              sx={{
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                marginBottom: "0.5rem", // Add space between username and city
              }}
            >
              {userData.username}
            </Typography>
            <Typography variant="h5" color="inherit">
              {userData.city}
            </Typography>
          </Grid>
        </Paper>
      </Container>
    );
  } else {
    return <p>Loading...</p>;
  }
}

export default MainFeaturedPost;
