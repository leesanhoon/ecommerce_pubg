"use client";
import React from 'react';
import Slider from 'react-slick';
import { Box, Container, Paper, Typography, Button } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const bannerItems = [
  {
    title: 'New Season Collection',
    description: 'Khám phá bộ sưu tập mới nhất của chúng tôi',
    imageUrl: 'https://picsum.photos/1200/400',
    action: 'Mua ngay',
  },
  {
    title: 'Summer Sale',
    description: 'Giảm giá lên đến 50% cho các sản phẩm mùa hè',
    imageUrl: 'https://picsum.photos/1200/400',
    action: 'Xem thêm',
  },
  {
    title: 'Special Offers',
    description: 'Ưu đãi đặc biệt cho thành viên',
    imageUrl: 'https://picsum.photos/1200/400',
    action: 'Tham gia ngay',
  },
];

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <Box sx={{ mb: 4, mt: 2 }}>
      <Slider {...settings}>
        {bannerItems.map((item, index) => (
          <Box key={index}>
            <Paper
              sx={{
                position: 'relative',
                height: { xs: '200px', md: '400px' },
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${item.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                borderRadius: 0,
              }}
            >
              <Container maxWidth="lg">
                <Box
                  sx={{
                    color: 'white',
                    textAlign: 'center',
                    maxWidth: 600,
                    mx: 'auto',
                  }}
                >
                  <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                      fontSize: { xs: '2rem', md: '3.5rem' },
                      fontWeight: 'bold',
                      mb: 2,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 3,
                      fontSize: { xs: '1rem', md: '1.5rem' },
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                    }}
                  >
                    {item.description}
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1,
                      fontSize: { xs: '1rem', md: '1.2rem' },
                      backgroundColor: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      },
                    }}
                  >
                    {item.action}
                  </Button>
                </Box>
              </Container>
            </Paper>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Banner;