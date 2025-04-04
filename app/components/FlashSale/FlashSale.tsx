import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Bolt } from '@mui/icons-material';
import CountdownTimer from './CountdownTimer';
import ProductCard from '../ProductCard/ProductCard';

// Mock data for flash sale products
const flashSaleProducts = [
  {
    id: '1',
    name: 'Steam Wallet 500 USD - Flash Deal',
    price: 11500000,
    originalPrice: 15000000,
    image: 'https://i.imgur.com/QZpxN8k.png',
    rating: 4.9,
    discount: 23,
  },
  {
    id: '2',
    name: 'Steam Game Code Bundle - 10 Games',
    price: 990000,
    originalPrice: 2500000,
    image: 'https://i.imgur.com/ZJ3HMq7.jpg',
    rating: 4.8,
    discount: 60,
  },
  {
    id: '3',
    name: 'PUBG Mobile 16800 UC - Super Deal',
    price: 2990000,
    originalPrice: 4500000,
    image: 'https://source.unsplash.com/800x600/?gaming,tournament',
    rating: 4.9,
    discount: 33,
  },
  {
    id: '4',
    name: 'PUBG G-Coin 20000 - Mega Pack',
    price: 3500000,
    originalPrice: 5000000,
    image: 'https://source.unsplash.com/800x600/?gaming,competition',
    rating: 4.8,
    discount: 30,
  },
];

const FlashSale = () => {
  // Set flash sale end time to 24 hours from now
  const endTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

  return (
    <Box
      sx={{
        py: 6,
        background: 'linear-gradient(-45deg, #ff0844 0%, #ff4563 100%)',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '16px',
        my: 4,
        boxShadow: '0 10px 20px rgba(255, 8, 68, 0.2)',
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
          background: 'linear-gradient(90deg, #fff 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(90deg, #fff 25%, transparent 25%) 0px 0/ 20px 20px',
          animation: 'slide 1s linear infinite',
          '@keyframes slide': {
            '0%': { backgroundPosition: '-10px 0, 0px 0' },
            '100%': { backgroundPosition: '10px 0, 20px 0' }
          }
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
            <Bolt
              sx={{
                color: 'white',
                fontSize: 40,
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.2)' },
                  '100%': { transform: 'scale(1)' }
                }
              }}
            />
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 900,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                textShadow: '0 0 10px rgba(255,255,255,0.5)',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: 'white',
                  boxShadow: '0 0 10px rgba(255,255,255,0.8)'
                }
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
            '& > div': {
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
              }
            }
          }}
        >
          {flashSaleProducts.map((product) => (
            <Box key={product.id} sx={{ position: 'relative' }}>
              <ProductCard {...product} />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  left: 8,
                  right: 8,
                  background: 'rgba(255,255,255,0.9)',
                  borderRadius: 1,
                  p: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5
                }}
              >
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Đã bán: {Math.floor(Math.random() * 100)} sản phẩm
                </Typography>
                <Box sx={{ width: '100%', bgcolor: '#ffebee', height: 4, borderRadius: 2 }}>
                  <Box
                    sx={{
                      width: `${Math.floor(Math.random() * 70 + 30)}%`,
                      bgcolor: 'error.main',
                      height: '100%',
                      borderRadius: 2,
                      transition: 'width 1s ease-in-out'
                    }}
                  />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FlashSale;