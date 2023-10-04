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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
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
        {/* End hero unit */}
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={2}>
            {items.map((item) => (
              <UserProduct key={item._id} item={item} />
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default Product;
