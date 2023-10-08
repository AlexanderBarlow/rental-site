import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SESSION_USER } from '../../utils/queries';

function MainFeaturedPost(props) {
  const { post } = props;

  // Get the 'id' from the route parameters
  const { id } = useParams();
  console.log(id);

  // Use the 'useQuery' hook to fetch user data
  const { loading, data } = useQuery(QUERY_SESSION_USER, {
    variables: { profileId: id }, // Pass 'id' as 'profileId'
  });
  console.log(data);

  const profile = data?.profile || {};

  if (loading) {
    return <div>Loading...</div>;
  }

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
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
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
              {profile.email}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              City: {profile.city}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageText: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default MainFeaturedPost;
