import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
  Chip,
  IconButton,
  Skeleton,
} from '@mui/material';
import { ShoppingCart, Favorite } from '@mui/icons-material';
import ProductDetails from '../ProductDetails/ProductDetails';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  description?: string;
  originalPrice?: number;
  image: string;
  rating: number;
  discount?: number;
  isLoading?: boolean;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

const ProductCard = ({
  id,
  name,
  price,
  description,
  originalPrice,
  image,
  rating,
  discount,
  isLoading = false,
}: ProductCardProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleCardClick = () => {
    setDetailsOpen(true);
  };

  if (isLoading) {
    return (
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Skeleton variant="rectangular" height={200} />
        <CardContent>
          <Skeleton variant="text" height={24} />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          transition: 'transform 0.2s',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-4px)',
            '& .product-actions': {
              opacity: 1,
            },
          },
        }}
        onClick={handleCardClick}
      >
        {discount && (
        <Chip
          label={`-${discount}%`}
          color="error"
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            zIndex: 1,
          }}
        />
      )}
      
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={name}
          sx={{ objectFit: 'cover' }}
        />
        <Box
          className="product-actions"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            opacity: 0,
            transition: 'opacity 0.2s',
          }}
        >
          <IconButton
            size="small"
            sx={{
              bgcolor: 'white',
              '&:hover': { bgcolor: 'grey.100' },
            }}
          >
            <Favorite />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              bgcolor: 'white',
              '&:hover': { bgcolor: 'grey.100' },
            }}
          >
            <ShoppingCart />
          </IconButton>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="h3"
          sx={{
            fontSize: '1rem',
            fontWeight: 500,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            height: '48px',
          }}
        >
          {name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={rating} readOnly size="small" precision={0.5} />
          <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
            ({rating})
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
            {formatPrice(price)}
          </Typography>
          {originalPrice && (
            <Typography
              variant="body2"
              sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
            >
              {formatPrice(originalPrice)}
            </Typography>
          )}
        </Box>
      </CardContent>
      </Card>

      <ProductDetails
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        product={{
          id,
          name,
          price,
          originalPrice,
          images: [image],
          rating,
          description: description || "No description available",
          discount,
          stockQuantity: 10,
          variants: [],
        }}
      />
    </>
  );
};

export default ProductCard;