import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Container, Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStripe } from "@fortawesome/free-brands-svg-icons";
import picOne from '../images/Checkout-social-card.png';
import picTwo from '../images/express_checkout_ce31841eb7.png';
import picThree from '../images/how-to-make-money-online.jpg';
import Typography from "@mui/material/Typography";

const cardData = [
  {
    id: 1,
    title: "Stripe",
    description: "Stripe is a payment processing platform with many features and security. It offers fast checkouts securely.",
    image: picOne,
    avatar: <FontAwesomeIcon icon={faStripe} />
  },
  {
    id: 2,
    title: "Tokens",
    description: "Our tokens add uniqueness to our marketplace! It makes it easy to buy and sell items.",
    image: picTwo,
    avatar: <FontAwesomeIcon icon={faStripe} />
  },
  {
    id: 3,
    title: "Withdrawals",
    description: "Currently our withdrawal system is in development. But, be ready to cash out all that dough!",
    image: picThree,
    avatar: <FontAwesomeIcon icon={faStripe} />
  },
];

export default function Features({ id }) {
  return (
    <>
    <Container sx={{ background: "#051923", width: "100%", minWidth: "100%", maxWidth: "100vw"}} id={id}>
      <Grid container spacing={2} justifyContent='center' alignItems='center'>
        {cardData.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
            <Card sx={{ maxWidth: '100%', width: "100%", textAlign: 'center' }}>
              <CardHeader
                avatar={card.avatar}
                title={card.title}
              />
              <CardMedia
                component="img"
                height="194"
                image={card.image}
                alt="Paella dish"
              />
              <CardContent>
                <Typography variant="h5" color="#000" fontStyle='bold'>
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </>
  );
}
