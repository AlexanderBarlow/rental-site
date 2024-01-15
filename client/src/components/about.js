import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import backdropPic from '../images/3D Paths - Lines 1 - Copy@1-2560x1363.jpg';

export default function Hero({ id }) {
    const backgroundStyle = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1,
    };

    return (
        <>
            <CssBaseline />
            <Box sx={{ position: 'relative', overflow: 'hidden' }} id={id}>
                <img src={backdropPic} alt="Background" style={backgroundStyle} />
                <Container sx={{ position: 'relative', zIndex: 1 }}>
                    <Box
                        sx={{
                            height: '100vh',
                            color: '#FFF',
                            paddingTop: '20vh', // Adjust the padding-top for text position
                            textAlign: 'center',
                            '@media (max-width:600px)': {
                                height: '100%',
                            },
                        }}
                    >
                        <Grid container spacing={6} justifyContent="center">
                            <Grid item xs={12} md={6}>
                                <Typography variant="h2" fontWeight="bold" sx={{ marginBottom: 5 }}>
                                    Selling
                                </Typography>
                                <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 5 }}>
                                    SignUp or Login
                                </Typography>
                                <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 5 }}>
                                    List your products on the Profile page
                                </Typography>
                                <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 5 }}>
                                    Each Token is $1.00 USD, so value your product accurately
                                </Typography>
                                <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 5 }}>
                                    Your item will then be listed on the market place. When purchased, the tokens will be transferred to your account.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h2" fontWeight="bold" sx={{ marginBottom: 5 }}>
                                    Buying
                                </Typography>
                                <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 5 }}>
                                    SignUp or Login
                                </Typography>
                                <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 5 }}>
                                    Purchase tokens securely through Stripe at the token link
                                </Typography>
                                <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 5 }}>
                                    Each Token is $1.00 USD, so buy as many tokens as you need
                                </Typography>
                                <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 5 }}>
                                    Visit the market place, add the item to your cart, and checkout.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
    );
}
