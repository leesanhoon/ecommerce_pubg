import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import ProductCard from '../ProductCard/ProductCard';

// Mock data for new products
const newProducts = [
  {
    id: '1',
    name: 'Steam Wallet 50 USD',
    price: 1250000,
    image: 'https://source.unsplash.com/800x600/?gaming,console',
    rating: 4.9,
  },
  {
    id: '2',
    name: 'Steam Wallet 100 USD',
    price: 2450000,
    originalPrice: 2500000,
    image: 'https://source.unsplash.com/800x600/?gaming,steam',
    rating: 4.9,
    discount: 2,
  },
  {
    id: '3',
    name: 'Steam Game Code - Cyberpunk 2077',
    price: 990000,
    originalPrice: 1200000,
    image: 'https://source.unsplash.com/800x600/?gaming,setup',
    rating: 4.7,
    discount: 17,
  },
  {
    id: '4',
    name: 'Steam Game Code - GTA V',
    price: 450000,
    image: 'https://source.unsplash.com/800x600/?gaming,computer',
    rating: 4.8,
  },
  {
    id: '5',
    name: 'PUBG Mobile 660 UC',
    price: 150000,
    image: 'https://source.unsplash.com/800x600/?gaming,keyboard',
    rating: 4.9,
  },
  {
    id: '6',
    name: 'PUBG Mobile 1800 UC',
    price: 390000,
    originalPrice: 400000,
    image: 'https://source.unsplash.com/800x600/?gaming,mouse',
    rating: 4.9,
    discount: 2.5,
  },
  {
    id: '7',
    name: 'PUBG G-Coin 1000',
    price: 230000,
    image: 'https://source.unsplash.com/800x600/?gaming,monitor',
    rating: 4.8,
  },
  {
    id: '8',
    name: 'PUBG G-Coin 2500',
    price: 550000,
    originalPrice: 575000,
    image: 'https://source.unsplash.com/800x600/?gaming,headset',
    rating: 4.8,
    discount: 4,
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