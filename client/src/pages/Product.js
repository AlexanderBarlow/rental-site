import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_ITEM } from "../utils/queries";
import ProductCard from "../components/ProductCard";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

const theme = createTheme();

const styles = {
  background: {
    background: "#051923",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "25px 0",
  },
  grid: {
    display: "flex",
    flexFlow: "row wrap",
    width: "100%",
    justifyContent: "center",
    margin: "0 auto",
    padding: "10px",
    paddingBottom: "50px",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "800px",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1600px",
    },
  },
};

const Product = () => {
  const { loading, data } = useQuery(QUERY_ALL_ITEM);
  let items;

  if (data) {
    items = data.items;
    console.log(items);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={styles.background}>
        <Box sx={{ pt: 8, pb: 6 }}>
          <Container maxWidth="lg">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="#FFF"
              gutterBottom
            >
              Market Place
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="#FFF"
              paragraph
            >
              Discover rental products!
            </Typography>
          </Container>
        </Box>

        <div style={styles.grid}>
            {items.map((item) => (
                <ProductCard item={item} key={item.item_id}/>
            ))}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Product;
