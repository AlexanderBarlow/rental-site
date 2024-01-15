import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { TextField, Button, Box, Typography, useMediaQuery } from '@mui/material';

const ADD_CREDITS = gql`
  mutation CreateCheckoutSession($quantity: Int!) {
    createCheckoutSession(quantity: $quantity) {
      sessionUrl
    }
  }
`;

const AddCredit = () => {
  const [quantity, setQuantity] = useState(1);
  const isLargeScreen = useMediaQuery('sm');

  const [createCheckoutSession] = useMutation(ADD_CREDITS);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value, 10));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createCheckoutSession({
        variables: { quantity },
      });
      
      const { sessionUrl } = data.createCheckoutSession;

      // Redirect to the checkout URL or handle the response
      window.location.href = sessionUrl; // Redirect to the Stripe Checkout URL
    } catch (error) {
      // Handle any errors here
      console.error('Error:', error);
    }
  };

  return (
    <Box
    sx={{
      width: 400,
      margin: 'auto',
      textAlign: 'center',
      height: isLargeScreen ? '100vh' : '100vh', // Adjusting height based on screen size
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: "#006494",
      width: "100%",
    }}
  >
    <Typography variant="h4" gutterBottom>Select Quantity of Credits</Typography>
    <form onSubmit={handleSubmit}>
    <TextField
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          InputProps={{
            inputProps: { min: 1 },
            sx: {
              textAlign: 'center', // Centering the text inside the input
              fontWeight: 'bold' // Making the text bold
            },
          }}
          sx={{
            width: 'fit-content',
            backgroundColor: "#fff",
            color: "#00A6FB",
            margin: 'auto', // Centering the input horizontally
            display: 'block', // Ensuring input is displayed as a block
            '& input': {
              textAlign: 'center', // Centering the text inside the input using input selector
              fontWeight: 'bold' // Making the text bold
            }
          }}
        />
      <Box sx={{ marginTop: 2, textAlign: 'center' }}>
        <Button variant="contained" type="submit">Purchase Credits</Button>
      </Box>
    </form>
  </Box>
  );
};

export default AddCredit;
