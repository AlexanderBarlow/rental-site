import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useMutation } from "@apollo/client";
import { UPDATE_ITEM_AVAILABILITY, ADD_ITEM_TO_CART } from "../utils/mutations";
import Auth from "../utils/auth";

function Product({ item }) {
  const [updateItemAvailability] = useMutation(UPDATE_ITEM_AVAILABILITY);
  const [addItemToCart] = useMutation(ADD_ITEM_TO_CART);

  const user = Auth.loggedIn() ? Auth.getProfile().data._id : null;

  const rented = async (event) => {
    event.preventDefault();
    if (item.availability) {
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

  return (
    <Grid item xs={12} md={12}>
      <CardActionArea style={styles} component="a" href="#">
        <Card style={styles.bgcolor} sx={{ display: "flex" }}>
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
            <div style={styles.btn}>
              <Button
                variant="contained"
                className="glow"
                id={item._id}
                onClick={rented}
                disabled={!item.availability}
              >
                {item.availability ? "Add to Cart" : "Unavailable"}
              </Button>
            </div>
          </CardContent>
          <CardMedia
            component="img"
            sx={{
              width: "150px",
              height: "150px",
              display: { xs: "none", sm: "block" },
            }}
            image={img.image}
            alt="alt text"
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default Product;
