import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { ADD_ITEM } from "../utils/mutations";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { storage } from "../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const styles = {
  container: {
    display: "flex",
    flex: "column",
    justifyContent: "center",
  },
  label: {
    flex: "0 0 100%",
  },
  background: {
    display: "flex",
  },
  hidden: {
    display: "none",
  },
  centered: {
    display: "flex",
    justifyContent: "center",
  },
};

const ProductForm = () => {
  const [formState, setFormState] = useState({
    itemName: "",
    description: "",
    itemPrice: "",
    city: "",
  });
  const [addProduct, { error }] = useMutation(ADD_ITEM);
  const [productImage, setProductImage] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const userId = Auth.getToken();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log(formState);

    try {
      const { data } = await addProduct({
        variables: {
          ...formState,
          itemImage: isImageUploaded
            ? null
            : await uploadImage(productImage, "product", userId),
        },
      });

      const profileUrl = `/profile/${userId}`;
      window.location.replace(profileUrl);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });

    console.log(formState);
  };

  const uploadImage = async (image, imageType, userId) => {
    if (image == null) {
      return null;
    }

    const imageRef = ref(storage, `images/${image.name + userId}`);
    await uploadBytes(imageRef, image);

    // Get the download URL for the uploaded file
    const imageUrl = await getDownloadURL(imageRef);

    setIsImageUploaded(true);

    return imageUrl;
  };

  const theme = createTheme();

  return (
    <ThemeProvider style={styles.background} theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1622737133809-d95047b9e673?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80)",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Add a Product!
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleFormSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Product Name"
                name="itemName"
                autoFocus
                value={formState.itemName}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="description"
                label="Description"
                value={formState.description}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Product's Price"
                name="itemPrice"
                autoFocus
                value={formState.itemPrice}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="city"
                label="Product's City"
                value={formState.city}
                onChange={handleChange}
              />
              <Box
                sx={{
                  mb: 2,
                  ...styles.centered,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <label htmlFor="backgroundImageInput">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    sx={{ mt: 2 }}
                  >
                    Upload Background Image <UploadFileIcon />
                  </Button>
                </label>
                <input
                  id="backgroundImageInput"
                  style={styles.hidden}
                  type="file"
                  onChange={(e) => {
                    setProductImage(e.target.files[0]);
                  }}
                />
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add your Product!
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default ProductForm;
