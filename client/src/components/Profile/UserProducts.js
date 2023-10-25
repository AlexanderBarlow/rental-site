import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import { QUERY_ITEMS } from '../../utils/queries';
import Auth from '../../utils/auth';
import { GetItemDetails } from '../../utils/queries';

function FeaturedPost({ item }) {
  const auth = Auth.getProfile();
  const ID = auth.data._id;

  const { data, loading, error } = useQuery(QUERY_ITEMS, {
    variables: { profileId: ID },
  });

  const { results } = useQuery(GetItemDetails, {
    variables: { itemIds: item },
  });

  console.log(results);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (data && data.profile) {
      setUserData(data.profile.rentable_items);
    }
  }, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if(error) {
    return <p>Error</p>
  }

  const itemData = data

  const styles = {
    bgcolor: {
      background: '#003554',
    },
    font: {
      fontFamily: 'Times New Roman',
    },
    border: '5px solid black',
    boxShadow: '5px 10px 10px #00A6FB',
    marginBottom: '30px',
    borderRadius: '10px',
  };

  const img = {
    image: 'https://source.unsplash.com/random',
  };

  if (!userData || userData.length === 0) {
    return <div>No Rentable Items</div>;
  }

  if (!userData || userData.length === 0) {
    return <div>No Rentable Items</div>;
  }
  

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea style={styles} component="a" href="#">
          <Card
            style={styles.bgcolor}
            sx={{ display: 'flex' }}
          >
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5" color="white">
                {itemData.itemName}
              </Typography>
              <Typography style={styles.font} variant="subtitle1" color="white">
                {itemData.description}
              </Typography>
              <Typography variant="subtitle1" paragraph color="white">
                ${itemData.itemPrice}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ width: '150px', height: '150px', display: { xs: 'none', sm: 'block' } }}
              image={img.image}
              alt="alt text"
            />
          </Card>
      </CardActionArea>
    </Grid>
  );
} 

FeaturedPost.propTypes = {
  item: PropTypes.object.isRequired, // Define the shape of your item prop as needed
};

export default FeaturedPost;
