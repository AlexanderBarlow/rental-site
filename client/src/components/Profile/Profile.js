import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ContactCard from "./ContactCard";
import ProductCard from "./UserProducts";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import { useQuery } from "@apollo/client";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { QUERY_ALL_ITEM } from "../../utils/queries";
import { QUERY_SESSION_USER } from "../../utils/queries";
import Auth from "../../utils/auth";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { QUERY_ITEMS } from "../../utils/queries";
import { GetItemDetails } from "../../utils/queries";
import { useApolloClient } from "@apollo/client";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";

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

const img = {
  image: "https://source.unsplash.com/random",
};

const styles = {
  marginBottom: "50px",
  bgcolor: {
    background: "#003554",
  },
  font: {
    fontFamily: "Times New Roman",
  },
  center: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "10px"
  },
  btn: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#00A6FB",
    background: "#051923",
  },
  border: "5px solid black",
  boxShadow: "5px 10px 10px #00A6FB",
  marginBottom: "30px",
  borderRadius: "10px",
  footerHeight: "100px",
  background: {
    background: "#051923",
    padding: "2%",
    justifyContent: "center",
    alignItems: "start",
    minHeight: "100vh",
    paddingBottom: "50px",
  },
  container: {
    maxWidth: "100%",
    padding: "0 15px", // Add padding to maintain distance from the edges
    margin: "0 auto", // Center the container
  },
  card: {
    width: "100%", // Set default width to 100%
    "@media (max-width: 800px)": {
      width: "90%",
      height: '100%',
      minHeight: '100%',
      padding: "0 15px", // Add padding to maintain distance from the edges
    },
  },
};

const theme = createTheme();

export default function Blog() {
  const client = useApolloClient();
  const auth = Auth.getProfile();
  const ID = auth.data._id;
  let itemId = [];

  const [showDetails, setShowDetails] = useState([]);
  const { data, loading, error } = useQuery(QUERY_ITEMS, {
    variables: { profileId: ID },
  });

  useEffect(() => {
    if (data) {
      const rentData = data.rentable_items;
      console.log(rentData);

      setShowDetails(rentData);
    }
  }, [data]);

  console.log(showDetails);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={styles.background}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ContactCard
            post={{
              image: "https://source.unsplash.com/random",
            }}
            style={{ margin: "20px auto" }}
          />
        <main>
        
              <div style={styles.center}>
              <Link to="/addproduct">
                <Button variant="outlined" style={styles.btn} className="glow">
                  Add your Product!
                </Button>
                </Link>
              </div>
           
          <Container maxWidth="lg" style={styles.container} sx={{...styles.card}}>
            <Grid container spacing={3}>
              {showDetails.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item._id}>
                  <Card sx={{ bgcolor: "#006494",}}>
                    <CardHeader
                      avatar={<Avatar sx={{ bgcolor: red[500] }}>R</Avatar>}
                      title={item.itemName}
                      subheader={item.itemPrice}
                    />
                    <CardMedia
                      component="img"
                      height="250"
                      image={img.image}
                      alt="Product Image"
                    />
                    <CardContent>
                      <Button variant="outlined" sx={{ background: "#051923" }}>
                        Remove Item
                      </Button>
                    </CardContent>
                    <CardActions disableSpacing>
                      <Button
                        onClick={handleExpandClick}
                        sx={{ color: "white" }}
                        endIcon={<ExpandMoreIcon />}
                      ></Button>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography paragraph>Description:</Typography>
                        <Typography paragraph>{item.description}</Typography>
                      </CardContent>
                    </Collapse>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </ThemeProvider>
    </div>
  );
}
