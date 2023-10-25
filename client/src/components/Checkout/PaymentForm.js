import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function PaymentForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Email Owner
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography>
            Hello, my name is John and I am in the Philadelphia area. I would like to contact you 
            about renting your Lawnmower. Please reach back so we could work out further details!
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}