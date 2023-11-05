import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import backdropPic from '../images/3D Paths - Lines 1 - Copy@1-2560x1363.jpg';
import Background from '../background';

export default function Hero() {
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
            <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                <img src={backdropPic} alt="Background" style={backgroundStyle} />
                <Container sx={{ position: 'relative', zIndex: 1 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            height: '100vh',
                            color: '#FFF',
                            paddingTop: '20vh', // Adjust the padding-top for text position
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h2" fontWeight="bold">Welcome to NestEase, a Rental Site</Typography>
                        <Typography variant="h5" fontWeight="bold">NestEase is a simple-to-use rental site. The site functions off of tokens, which you can purchase through Stripe. For more information checkout the get started.</Typography>
                    </Box>
                </Container>
            </Box>
        </>
    );
}
