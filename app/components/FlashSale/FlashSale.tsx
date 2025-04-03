import React from 'react';
import { Box, Container, Typography, Grid, useTheme } from '@mui/material';
import { Bolt } from '@mui/icons-material';
import CountdownTimer from './CountdownTimer';
import ProductCard from '../ProductCard/ProductCard';

// Mock data for flash sale products
const flashSaleProducts = [
  {
    id: '1',
    name: 'PUBG Gaming Backpack Pro',
    price: 499000,
    originalPrice: 1200000,
    image: 'https://picsum.photos/400/400',
    rating: 4.7,
    discount: 58,
  },
  {
    id: '2',
    name: 'Gaming Mouse Pad XL',
    price: 199000,
    originalPrice: 450000,
    image: 'https://picsum.photos/400/400',
    rating: 4.5,
    discount: 55,
  },
  {
    id: '3',
    name: 'USB Gaming Headset Stand',
    price: 299000,
    originalPrice: 600000,
    image: 'https://picsum.photos/400/400',
    rating: 4.6,
    discount: 50,
  },
  {
    id: '4',
    name: 'RGB LED Strip Gaming',
    price: 159000,
    originalPrice: 400000,
    image: 'https://picsum.photos/400/400',
    rating: 4.4,
    discount: 60,
  },
];

const FlashSale = () => {
  const theme = useTheme();
  
  // Set flash sale end time to 24 hours from now
  const endTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

  return (
    <Box 
      sx={{
        py: 6,
        backgroundColor: 'error.main',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)',
          backgroundSize: '20px 20px',
        }}
      />
      
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 4,
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Bolt sx={{ color: 'white', fontSize: 40 }} />
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 'bold',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Flash Sale
            </Typography>
          </Box>
          
          <CountdownTimer endTime={endTime} />
        </Box>

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
          {flashSaleProducts.map((product) => (
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

export default FlashSale;