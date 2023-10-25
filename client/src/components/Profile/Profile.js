import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ContactCard from "./ContactCard";
import ProductCard from "./UserProducts";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import { useQuery } from "@apollo/client";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { QUERY_ALL_ITEM } from "../../utils/queries";
import { QUERY_SESSION_USER } from "../../utils/queries";
import Auth from "../../utils/auth";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { QUERY_ITEMS } from "../../utils/queries";
import { GetItemDetails } from "../../utils/queries";
import { useApolloClient } from "@apollo/client";

const styles = {
  marginBottom: "50px",
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
};

const mainFeaturedPost = {
  title: "@Username Here",
  description: "City: Philadelphia, PA",
  image: "https://source.unsplash.com/random",
  imageText: "main image description",
  linkText: "asdjklbf",
};

const featuredPosts = [
  {
    image:
      "https://www.rd.com/wp-content/uploads/2022/08/lawnmower-GettyImages-1096126656-MLedit.jpg?resize=768,512",
  },
  {
    image:
      "https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/Articles/types-of-car-jacks-2022-hero.jpg",
  },
  {
    image:
      "https://www.troybilt.com/on/demandware.static/-/Sites-troybilt-Library/default/dwf34185d4/images/product-line-browse/series-feature-card/41AS99MS766_TB430_env5_492x350.jpg",
  },
  {
    image:
      "https://www.verywellfamily.com/thmb/xFKeOxnoRogvhK_26nYG00rlqek=/1000x1000/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/_hero_SQ_Graco-4Ever-4-in-1-Convertible-Car-Seat-1-cc1b2ff4d0084bf2bd30b7d44ba33c1c.jpg",
  },
];

const img = {
  image: "https://source.unsplash.com/random",
};

const theme = createTheme();

export default function Blog() {
  const client = useApolloClient();
  const auth = Auth.getProfile();
  const ID = auth.data._id;
  let itemId = [];

  const [showDetails, setShowDetails] = useState([]);
  const { data, loading, error } = useQuery(QUERY_ITEMS, {
    variables: { profileId: ID },
  });

  useEffect(() => {
    if (data) {
      const rentData = data.rentable_items;
      console.log(rentData);
  
      // Assuming you want to set the showDetails to all items in rentData
      setShowDetails(rentData);
    }
  }, [data]);

  console.log(showDetails);



  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" >
        <main>
          <ContactCard post={mainFeaturedPost} />
          <Grid className="container" spacing={5} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              {showDetails.map((item) => (
              <CardActionArea style={styles} component="a" href="#">
                <Card
                  key={item._id}
                  style={styles.bgcolor}
                  sx={{ display: "flex" }}
                >
                  <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5" color="white">
                      {item.itemName}
                    </Typography>
                    <Typography
                      style={styles.font}
                      variant="subtitle1"
                      color="white"
                    >
                      {item.description}
                    </Typography>
                    <Typography variant="subtitle1" paragraph color="white">
                      ${item.itemPrice}
                    </Typography>
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
              ))}
            </Grid>
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
  );
}
