import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import { useQuery } from '@apollo/client';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import { QUERY_ITEMS } from '../../utils/queries';
import Auth from '../../utils/auth';
import { GetItemDetails } from '../../utils/queries';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function FeaturedPost({ item }) {
  const auth = Auth.getProfile();
  const ID = auth.data._id;

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  

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
      <Card sx={{ maxWidth: 345, bgcolor: "#006494" }}> 
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }}>
          R
        </Avatar>
      }
      title={item.itemName}
      subheader={item.itemPrice}
    />
    <CardMedia
      component="img"
      height="194"
      image={img.image}
      alt="Paella dish"
    />
    <CardContent>
      <Button variant="outlined" sx={{background: "#051923"}}>
        Remove
      </Button>
    </CardContent>
    <CardActions disableSpacing>
      <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </ExpandMore>
    </CardActions>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <Typography paragraph>Description:</Typography>
        <Typography paragraph>{item.description}</Typography>
      </CardContent>
    </Collapse>
  </Card>
      </CardActionArea>
    </Grid>
  );
} 

FeaturedPost.propTypes = {
  item: PropTypes.object.isRequired, // Define the shape of your item prop as needed
};

export default FeaturedPost;
