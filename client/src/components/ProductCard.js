import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { useMutation } from "@apollo/client";
import { UPDATE_ITEM_AVAILABILITY, ADD_ITEM_TO_CART } from "../utils/mutations";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PROFILE } from "../utils/queries";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Product({ item }) {
  const [updateItemAvailability] = useMutation(UPDATE_ITEM_AVAILABILITY);
  const [addItemToCart] = useMutation(ADD_ITEM_TO_CART);
  const { data: userData } = useQuery(
    QUERY_SINGLE_PROFILE,
    {
      variables: { profileId: item.itemOwner._id },
    }
  );

  const owner = userData?.profile || null;
  console.log(owner);

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


  const img = {
    image: "https://source.unsplash.com/random",
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{ maxWidth: 345, bgcolor: "#006494", flex: "0 0 100%", margin: "2%" }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "inherit" }}>
            {owner && owner.profileImage ? (
              <img
                src={owner.profileImage}
                alt="Owner's Profile"
                style={{ width: "100%", height: "100%", borderRadius: "50%" }}
              />
            ) : (
              "R"
            )}
          </Avatar>
        }
        title={item.itemName}
      />
      <CardMedia
        component="img"
        height="194"
        image={item.itemImage || img.image}
        alt="Paella dish"
      />
      {/* Display item price at the bottom in a larger, bold font */}
      <CardContent sx={{ textAlign: "center", paddingTop: "10px" }}>
        <Typography variant="h6" fontWeight="bold">
          Price: {item.itemPrice}
        </Typography>
      </CardContent>
      <CardContent>
        {item.availability ? (
          <Button
            variant="outlined"
            sx={{ background: "#051923" }}
            onClick={rented}
            id="addtocart"
          >
            Add to Cart
          </Button>
        ) : (
          <Button variant="outlined" sx={{ background: "#051923" }}>
            Unavailable
          </Button>
        )}
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
