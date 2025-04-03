import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import ProductCard from '../ProductCard/ProductCard';

// Mock data for new products
const newProducts = [
  {
    id: '1',
    name: 'PUBG Gaming Headset Pro X',
    price: 2990000,
    originalPrice: 3500000,
    image: 'https://picsum.photos/400/400',
    rating: 4.5,
    discount: 15,
  },
  {
    id: '2',
    name: 'Mechanical Gaming Keyboard RGB',
    price: 1890000,
    image: 'https://picsum.photos/400/400',
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Gaming Mouse Wireless 16000 DPI',
    price: 990000,
    originalPrice: 1200000,
    image: 'https://picsum.photos/400/400',
    rating: 4.6,
    discount: 20,
  },
  {
    id: '4',
    name: 'PUBG Limited Edition Gaming Chair',
    price: 4990000,
    image: 'https://picsum.photos/400/400',
    rating: 4.9,
  },
  {
    id: '5',
    name: 'Gaming Mousepad XXL RGB',
    price: 590000,
    originalPrice: 750000,
    image: 'https://picsum.photos/400/400',
    rating: 4.7,
    discount: 25,
  },
  {
    id: '6',
    name: 'PUBG Gaming Monitor 27" 165Hz',
    price: 7990000,
    image: 'https://picsum.photos/400/400',
    rating: 4.8,
  },
  {
    id: '7',
    name: 'Gaming PC Case RGB',
    price: 1490000,
    originalPrice: 1800000,
    image: 'https://picsum.photos/400/400',
    rating: 4.5,
    discount: 18,
  },
  {
    id: '8',
    name: 'PUBG Gaming Microphone',
    price: 890000,
    image: 'https://picsum.photos/400/400',
    rating: 4.4,
  },
];

const NewProducts = () => {
  return (
    <Box sx={{ py: 6, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          align="center"
          sx={{
            mb: 4,
            fontWeight: 'bold',
            color: 'primary.main',
            position: 'relative',
            '&::after': {
              content: '""',
              display: 'block',
              width: '60px',
              height: '4px',
              backgroundColor: 'primary.main',
              margin: '12px auto',
              borderRadius: '2px',
            },
          }}
        >
          Sản phẩm mới nhất
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: 3,
          }}
        >
          {newProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default NewProducts;