import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ContactCard from './ContactCard';
import ProductCard from './UserProducts';

import { useQuery } from '@apollo/client';

import { QUERY_ALL_ITEM } from '../../utils/queries'

const styles = {
  marginBottom: '50px',
}

const mainFeaturedPost = {
  title: '@Username Here',
  description:
    "City: Philadelphia, PA",
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
  linkText: "asdjklbf"
};

const featuredPosts = [
  {
    image: 'https://www.rd.com/wp-content/uploads/2022/08/lawnmower-GettyImages-1096126656-MLedit.jpg?resize=768,512',
  },
  {
    image: 'https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/Articles/types-of-car-jacks-2022-hero.jpg',
  },
  {
    image: 'https://www.troybilt.com/on/demandware.static/-/Sites-troybilt-Library/default/dwf34185d4/images/product-line-browse/series-feature-card/41AS99MS766_TB430_env5_492x350.jpg',
  },
  {
    image: 'https://www.verywellfamily.com/thmb/xFKeOxnoRogvhK_26nYG00rlqek=/1000x1000/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/_hero_SQ_Graco-4Ever-4-in-1-Convertible-Car-Seat-1-cc1b2ff4d0084bf2bd30b7d44ba33c1c.jpg',
  }
];

const theme = createTheme();

export default function Blog() {

  const { loading, data }  = useQuery(QUERY_ALL_ITEM);

  let items;

  if (data){
    items = data.items;
  };

  if (loading) {
    return <div>Loading...</div>
  }


  console.log(items)
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" style={styles}>
        <main>
          <ContactCard post={mainFeaturedPost} />
          <Grid className='container' spacing={5} sx={{ mt: 3 }}>
            {items.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
  );
}