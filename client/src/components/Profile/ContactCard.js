import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_SESSION_USER } from '../../utils/queries';
import Box from '@mui/material/Box';

function MainFeaturedPost(props) {
  const { post } = props;
  const auth = Auth.getProfile();
  const ID = auth.data._id;

  const { data, loading, error } = useQuery(QUERY_SESSION_USER, {
    variables: { profileId: ID },
  });

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (data && data.profile) {
      setUserData(data.profile);
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
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${post.image})`,
        }}
      >
        {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                {userData.email}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {userData.city}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    );
  } else {
    return <p>Loading...</p>;
  }
}

export default MainFeaturedPost;
