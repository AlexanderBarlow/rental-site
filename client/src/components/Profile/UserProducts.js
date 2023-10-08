import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useQuery } from '@apollo/client';
import Button from '@mui/material/Button';

import { QUERY_ALL_ITEM } from '../../utils/queries'

function FeaturedPost({item}) {

  // const { loading, data }  = useQuery(QUERY_ALL_ITEM);

  // const item = data?.items || {};

  // console.log(data)
  // console.log(item)

  // if (loading) {
  //   return <div>Loading...</div>
  // }

  // const { post } = props;

  const styles = {
    bgcolor: {
      background: '#003554'
    },
    font: {
      fontFamily: 'Times New Roman',
    },
    border: '5px solid black',
    boxShadow: '5px 10px 10px #00A6FB',
    marginBottom: '30px',
    borderRadius: '10px',
  }

  const img = {
    image: 'https://source.unsplash.com/random',
  };

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea style={styles} component="a" href="#">
        <Card style={styles.bgcolor} sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5" color="white">
              {item.itemName}
            </Typography>
            <Typography style={styles.font} variant="subtitle1" color="white">
              {item.description}
            </Typography>
            <Typography variant="subtitle1" paragraph color="white">
              ${item.itemPrice}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: '150px', height: "150px", display: { xs: 'none', sm: 'block' } }}
            image={img.image}
            alt='alt text'
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

// FeaturedPost.propTypes = {
//   post: PropTypes.shape({
//     date: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     imageLabel: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default FeaturedPost;