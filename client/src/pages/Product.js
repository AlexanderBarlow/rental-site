import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_ITEM } from '../utils/queries';
import ProductCard from '../components/ProductCard';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import UserProduct from '../components/ProductCard';

const theme = createTheme();
const styles = {
  background: {
    background: "#006494",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    height: "100%",
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingLeft: "4%",
    paddingRight: "4%",
  }
}

const largeScreenStyles = {
  [theme.breakpoints.up("lg")]: {
    height: "100vh",
    widthL: "100vw",
  },
};

const Product = () => {
  const { loading, data } = useQuery(QUERY_ALL_ITEM);
  let items;

  if (data) {
    items = data.items;
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ ...styles.background, ...largeScreenStyles }}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        
        <Box
          sx={{
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm" >
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Market Place
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Discover rental products!
            </Typography>
          </Container>
        </Box>
        
        <div style={styles.container}>
          <Grid container spacing={{ xs: 4, sm: 8, md: 20 }} >
            {items.map((item) => (
              <Grid item xs={12} md={6} lg={6} xl={3}>
              <UserProduct key={item._id} item={item} />
              </Grid>
            ))}
          </Grid>
        </div>
      </main>
    </ThemeProvider>
    </div>
  );
};

export default Product;
