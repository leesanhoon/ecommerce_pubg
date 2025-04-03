import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Rating,
  Button,
  TextField,
  Card,
  CardMedia,
  Chip,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Close,
  Add,
  Remove,
  ShoppingCart,
  FavoriteBorder,
} from '@mui/icons-material';
import { useCart } from '@/app/contexts/CartContext';

interface ProductDetailsProps {
  open: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    images: string[];
    rating: number;
    description: string;
    discount?: number;
    variants?: { name: string; options: string[] }[];
    stockQuantity: number;
  };
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ open, onClose, product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { addItem } = useCart();

  const handleQuantityChange = (value: number | string) => {
    const numValue = typeof value === 'string' ? parseInt(value, 10) : value;
    
    if (isNaN(numValue)) {
      setQuantity(1);
      return;
    }

    if (numValue < 1) {
      setQuantity(1);
    } else if (numValue > product.stockQuantity) {
      setQuantity(product.stockQuantity);
    } else {
      setQuantity(numValue);
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]
    }, quantity);
    setSnackbarOpen(true);
    setTimeout(() => onClose(), 1500);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        aria-labelledby="product-details-title"
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'grey.500',
            zIndex: 1,
          }}
        >
          <Close />
        </IconButton>

        <DialogContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            {/* Left side - Image Gallery */}
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
              <Card sx={{ width: '100%', position: 'relative' }}>
                {product.discount && (
                  <Chip
                    label={`-${product.discount}%`}
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
                <CardMedia
                  component="img"
                  image={product.images[selectedImage]}
                  alt={product.name}
                  sx={{ width: '100%', height: 400, objectFit: 'contain' }}
                />
              </Card>
              <Box sx={{ display: 'flex', gap: 1, mt: 2, overflowX: 'auto', pb: 1 }}>
                {product.images.map((image, index) => (
                  <Card
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    sx={{
                      width: 80,
                      height: 80,
                      cursor: 'pointer',
                      border: index === selectedImage ? '2px solid' : 'none',
                      borderColor: 'primary.main',
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={image}
                      alt={`${product.name} view ${index + 1}`}
                      sx={{ height: '100%', objectFit: 'cover' }}
                    />
                  </Card>
                ))}
              </Box>
            </Box>

            {/* Right side - Product Information */}
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' } }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {product.name}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={product.rating} readOnly precision={0.5} />
                <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                  ({product.rating})
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 3 }}>
                <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
                  {formatPrice(product.price)}
                </Typography>
                {product.originalPrice && (
                  <Typography
                    variant="body1"
                    sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                  >
                    {formatPrice(product.originalPrice)}
                  </Typography>
                )}
              </Box>

              <Typography variant="body1" sx={{ mb: 3 }}>
                {product.description}
              </Typography>

              {/* Variants Selection */}
              {product.variants?.map((variant) => (
                <Box key={variant.name} sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    {variant.name}:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {variant.options.map((option) => (
                      <Chip
                        key={option}
                        label={option}
                        onClick={() =>
                          setSelectedVariants({
                            ...selectedVariants,
                            [variant.name]: option,
                          })
                        }
                        color={
                          selectedVariants[variant.name] === option
                            ? 'primary'
                            : 'default'
                        }
                        sx={{ cursor: 'pointer' }}
                      />
                    ))}
                  </Box>
                </Box>
              ))}

              {/* Quantity Selection */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Typography variant="subtitle1">Số lượng:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    size="small"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Remove />
                  </IconButton>
                  <TextField
                    size="small"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    onBlur={() => {
                      handleQuantityChange(quantity);
                    }}
                    inputProps={{
                      type: 'number',
                      min: 1,
                      max: product.stockQuantity,
                      style: { textAlign: 'center', width: '60px' },
                      'aria-label': 'Số lượng',
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stockQuantity}
                  >
                    <Add />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {product.stockQuantity} sản phẩm có sẵn
                </Typography>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCart />}
                  onClick={handleAddToCart}
                  fullWidth
                >
                  Thêm vào giỏ hàng ({quantity})
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<FavoriteBorder />}
                >
                  Yêu thích
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Đã thêm {quantity} {quantity > 1 ? 'sản phẩm' : 'sản phẩm'} vào giỏ hàng!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductDetails;