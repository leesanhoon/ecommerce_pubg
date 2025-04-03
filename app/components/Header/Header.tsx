"use client";
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  TextField,
  Box,
  Button,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  keyframes,
  styled,
} from '@mui/material';
import {
  Search as SearchIcon,
  ShoppingCart as CartIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useCart } from '@/app/contexts/CartContext';

const shakeAnimation = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-10deg); }
  75% { transform: rotate(10deg); }
`;

const CartButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'isShaking',
})<{ isShaking?: boolean }>(({ theme, isShaking }) => ({
  color: theme.palette.primary.main,
  animation: isShaking ? `${shakeAnimation} 0.5s ease-in-out` : 'none',
}));
const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, isShaking } = useCart();

  const menuItems = ['Trang chủ', 'Sản phẩm', 'Giới thiệu', 'Liên hệ'];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'white' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleMobileMenu}
            sx={{ color: 'primary.main' }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          component="div"
          sx={{ color: 'primary.main', fontWeight: 'bold', flexGrow: isMobile ? 0 : 1 }}
        >
          PUBG STORE
        </Typography>

        {!isMobile && (
          <Box sx={{ flexGrow: 2, display: 'flex', justifyContent: 'center' }}>
            <TextField
              size="small"
              placeholder="Tìm kiếm sản phẩm..."
              sx={{
                width: '50%',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {!isMobile && menuItems.map((item) => (
            <Button
              key={item}
              color="primary"
              sx={{ textTransform: 'none' }}
            >
              {item}
            </Button>
          ))}
          <CartButton color="primary" isShaking={isShaking}>
            <Badge badgeContent={totalItems} color="error">
              <CartIcon />
            </Badge>
          </CartButton>
        </Box>


        <Drawer
          anchor="left"
          open={mobileMenuOpen}
          onClose={toggleMobileMenu}
        >
          <Box sx={{ width: 250, pt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2 }}>
              <IconButton onClick={toggleMobileMenu}>
                <CloseIcon />
              </IconButton>
            </Box>
            <List>
              {menuItems.map((item) => (
                <ListItem key={item} sx={{ cursor: 'pointer' }}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Toolbar>

      {isMobile && (
        <Toolbar sx={{ py: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Tìm kiếm sản phẩm..."
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
              },
            }}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </Toolbar>
      )}
    </AppBar>
  );
};

export default Header;