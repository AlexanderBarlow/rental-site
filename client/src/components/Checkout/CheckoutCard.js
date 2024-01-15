import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useQuery } from "@apollo/client";
import { GET_CART } from "../../utils/queries";
import Auth from "../../utils/auth";
import { useState, useEffect } from "react";
import { Button } from '@mui/material';

const styles = {
  bgcolor: {
    background: "#003554",
    height: "100vh",
  },
  paper: {
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px 0',
  },
};

function Cart() {
  const [cartData, setCartData] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const userId = Auth.loggedIn() ? Auth.getProfile().data._id : null;

  const { loading, data, error } = useQuery(GET_CART, {
    variables: { userId },
    skip: !userId,
  });

  useEffect(() => {
    if (data && data.userCart) {
      setCartData(data.userCart);

      const prices = data.userCart.map((item) => parseFloat(item.itemPrice));
      const total = prices.reduce((acc, price) => acc + price, 0);
      setCartTotal(total);
    }
  }, [data]);

  console.log(data);

  const theme = createTheme();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <Box sx={{...styles.bgcolor, display: "flex", alignItems: "center", justifyContent: "center"}}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <form>
        <Container maxWidth="md">
          <Paper sx={{ ...styles.paper }}>
            <Typography component="h2" variant="h5" color="textPrimary" gutterBottom>
              Your Cart Summary
            </Typography>
            {cartData.map((item) => (
              <Box key={item.id} sx={styles.item}>
                <Typography>{item.itemName}</Typography>
                <Typography>${item.itemPrice}</Typography>
              </Box>
            ))}
            <Box sx={{ ...styles.item, borderTop: '1px solid #ccc', paddingTop: '10px' }}>
              <Typography variant="h6" color="textPrimary">
                Total:
              </Typography>
              <Typography variant="h6" color="textPrimary">
                ${cartTotal}
              </Typography>
            </Box>
           
            <Button variant="contained" style={{marginTop: "20px"}} className="glow" type='submit'>Checkout</Button>
            
          </Paper>
        </Container>
        </form>
      </ThemeProvider>
    </Box>
  );
}

export default Cart;
