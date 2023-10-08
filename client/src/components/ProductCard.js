import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_ITEM } from '../utils/queries'

function Product({ item }) {

  const rented = (event) => {
    event.preventDefault();
    document.getElementById(item._id).innerHTML = 'Rented';
  }

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
        <Button variant="contained" style={styles.btn} className="glow" id={item._id} onClick={rented}>
          Add your Product!
        </Button>
      </CardActionArea>
    </Grid>
  );
}

export default Product;
