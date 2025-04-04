"use client";
import React from 'react';
import { Box, Container, Typography, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import Slider from 'react-slick';
import ProductCard from '../ProductCard/ProductCard';

// Mock data for best selling products
const bestSellers = [
  {
    id: '1',
    name: 'Steam Wallet 200 USD',
    price: 4800000,
    originalPrice: 5000000,
    image: 'https://i.imgur.com/QZpxN8k.png',
    rating: 4.9,
    discount: 4,
  },
  {
    id: '2',
    name: 'Steam Game Code - EA Play Pro 1 Year',
    price: 2900000,
    originalPrice: 3200000,
    image: 'https://i.imgur.com/ZJ3HMq7.jpg',
    rating: 4.8,
    discount: 9,
  },
  {
    id: '3',
    name: 'PUBG Mobile 3600 UC',
    price: 750000,
    originalPrice: 800000,
    image: 'https://source.unsplash.com/800x600/?gaming,playstation',
    rating: 4.9,
    discount: 6,
  },
  {
    id: '4',
    name: 'PUBG Mobile 6000 UC',
    price: 1200000,
    originalPrice: 1300000,
    image: 'https://source.unsplash.com/800x600/?gaming,xbox',
    rating: 4.9,
    discount: 7,
  },
  {
    id: '5',
    name: 'PUBG G-Coin 5000',
    price: 1050000,
    originalPrice: 1150000,
    image: 'https://source.unsplash.com/800x600/?gaming,nintendo',
    rating: 4.8,
    discount: 8,
  },
  {
    id: '6',
    name: 'PUBG G-Coin 10000',
    price: 2000000,
    originalPrice: 2300000,
    image: 'https://source.unsplash.com/800x600/?gaming,esports',
    rating: 4.8,
    discount: 13,
  },
];

const BestSellers = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const SlickArrow = ({
    direction,
    onClick,
  }: {
    direction: 'left' | 'right';
    onClick?: () => void;
  }) => (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1,
        bgcolor: 'white',
        boxShadow: theme.shadows[2],
        ...(direction === 'left' ? { left: -16 } : { right: -16 }),
        '&:hover': {
          bgcolor: 'grey.100',
        },
      }}
    >
      {direction === 'left' ? <ArrowBack /> : <ArrowForward />}
    </IconButton>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : isTablet ? 2 : 4,
    slidesToScroll: isMobile ? 1 : isTablet ? 2 : 4,
    prevArrow: <SlickArrow direction="left" />,
    nextArrow: <SlickArrow direction="right" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ py: 6, backgroundColor: 'white' }}>
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
          Sản phẩm bán chạy
        </Typography>

        <Box sx={{ mx: { xs: 2, md: 3 }, position: 'relative' }}>
          <Slider {...settings}>
            {bestSellers.map((product) => (
              <Box key={product.id} sx={{ p: 1 }}>
                <ProductCard {...product} />
              </Box>
            ))}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
};

export default BestSellers;