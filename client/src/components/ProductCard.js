import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
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
import { useMutation } from "@apollo/client";
import { UPDATE_ITEM_AVAILABILITY, ADD_ITEM_TO_CART } from "../utils/mutations";
import Auth from "../utils/auth";

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

function Product({ item }) {
  const [updateItemAvailability] = useMutation(UPDATE_ITEM_AVAILABILITY);
  const [addItemToCart] = useMutation(ADD_ITEM_TO_CART);

  const user = Auth.loggedIn() ? Auth.getProfile().data._id : null;

  const rented = async (event) => {
    event.preventDefault();
    if (!user) {
      window.alert("Please log in to add this item to the cart.");
      return;
    }

    if (item.availability && user) {
      try {
        await updateItemAvailability({
          variables: {
            _id: item._id,
          },
        });

        await addItemToCart({
          variables: {
            itemId: item._id,
            userId: user,
            skip: !user,
          },
        });
      } catch (error) {
        console.error("An error occurred while processing the request:", error);
        // Handle error, show a message, etc.
      }
    }
  };

  const styles = {
    bgcolor: {
      background: "#006494",
    },
    font: {
      fontFamily: "Times New Roman",
    },
    border: "5px solid black",
    marginBottom: "30px",
    borderRadius: "10px",
    btn: {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
    },
  };

  const img = {
    image: "https://source.unsplash.com/random",
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, bgcolor: "#006494", flex: "0 0 100%", margin: "2%" }}> 
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
      <Button variant="outlined" sx={{background: "#051923"}} onClick={rented}>
        Add to Cart
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
  );
}

export default Product;
