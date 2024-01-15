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

  const img = {
    image: "https://source.unsplash.com/random",
  };

  useEffect(() => {
    if (data && data.profile) {
      setUserData(data.profile);

      // Assuming that data.profile.profileImage is the URL of the profile image in Firebase
      setProfileImageUrl(data.profile.profileImage);
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (userData && profileImageUrl) {
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
            backgroundImage: `url(${profileImageUrl || img.image})`,
            justifySelf: "center",
            width: "100%",
            padding: "0 2%",
            display: "flex", // Added display flex to enable alignment
          }}
        >
          <Grid container>
            <Grid item md={6}>
              <Box
                sx={{
                  position: "relative",
                  p: { xs: 2, md: 6 },
                  pr: { md: 0 },
                }}
              >
                <Typography
                  component="h1"
                  variant="h3"
                  color="inherit"
                  gutterBottom
                  sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" } }}
                >
                  {userData.username}
                </Typography>
                <Typography
                  variant="h5"
                  color="inherit"
                  paragraph
                  sx={{ fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" } }}
                >
                  {userData.city}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              md={6}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Avatar
                alt="Profile Avatar"
                src={profileImageUrl || img.image}
                sx={{ width: 100, height: 100, marginRight: 2 }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  } else {
    return <p>Loading...</p>;
  }
}

export default MainFeaturedPost;
