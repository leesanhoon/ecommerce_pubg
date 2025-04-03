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
    name: 'PUBG Special Edition Controller',
    price: 1990000,
    originalPrice: 2500000,
    image: 'https://picsum.photos/400/400',
    rating: 4.9,
    discount: 20,
  },
  {
    id: '2',
    name: 'Gaming Laptop PUBG Edition',
    price: 29900000,
    image: 'https://picsum.photos/400/400',
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Professional Gaming Headset',
    price: 2490000,
    originalPrice: 2990000,
    image: 'https://picsum.photos/400/400',
    rating: 4.7,
    discount: 15,
  },
  {
    id: '4',
    name: 'Mechanical Keyboard RGB',
    price: 2190000,
    image: 'https://picsum.photos/400/400',
    rating: 4.6,
  },
  {
    id: '5',
    name: 'Gaming Mouse Pro',
    price: 1490000,
    originalPrice: 1890000,
    image: 'https://picsum.photos/400/400',
    rating: 4.8,
    discount: 25,
  },
  {
    id: '6',
    name: 'Gaming Chair Ergonomic',
    price: 3990000,
    image: 'https://picsum.photos/400/400',
    rating: 4.5,
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