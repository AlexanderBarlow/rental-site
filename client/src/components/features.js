import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LOGO from "../images/logo.png";
import { Container, Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStripe } from "@fortawesome/free-brands-svg-icons";
import picOne from '../images/Checkout-social-card.png';
import picTwo from '../images/express_checkout_ce31841eb7.png';
import picThree from '../images/how-to-make-money-online.jpg';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

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
    description: "Currently our withdrawal system is in development. But, be ready to cashout all that dough!",
    image: picThree,
    avatar: <FontAwesomeIcon icon={faStripe} />
  },
];

export default function Features({ id }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Container sx={{background: "#051923", width: "100%", minWidth: "100%", justifyContent: 'center', alignContent: 'center'}} id={id}>
      <Grid container spacing={2} justifyContent='center' alignContent='center'>
        {cardData.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
            <Card sx={{ maxWidth: 350, width: "100%" }}>
              <CardHeader
                avatar={
                  card.avatar 
                }
                title={card.title}
              />
              <CardMedia
                component="img"
                height="194"
                image={card.image}
                alt="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                 {card.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Method:</Typography>
                  {/* ... rest of the content */}
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
