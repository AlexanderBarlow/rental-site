import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
function Product({ item }) {
  const rented = (event) => {
    event.preventDefault();
    document.getElementById(item._id).innerHTML = "In Cart";
    document.getElementById(item._id).style.background = "#00A6FB";
  };

  const styles = {
    bgcolor: {
      background: "#003554",
    },
    font: {
      fontFamily: "Times New Roman",
    },
    border: "5px solid black",
    boxShadow: "5px 10px 10px #00A6FB",
    marginBottom: "30px",
    borderRadius: "10px",
    btn: {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",

    }
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
            >
              Add to Cart
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
