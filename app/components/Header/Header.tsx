  "use client";
import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
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
  Paper,
  Popper,
  Fade,
  ClickAwayListener,
  TextField,
  Grid,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  KeyboardArrowDown as ArrowDownIcon,
  ChevronRight as ChevronRightIcon,
  SportsEsports as SportsEsportsIcon,
  LocalAtm as LocalAtmIcon,
  Search as SearchIcon,
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
  '&:hover': {
    backgroundColor: 'transparent'
  }
}));
const menuData = {
  'Steam Wallet': {
    icon: <LocalAtmIcon />,
    subcategories: [
      {
        title: 'Nạp Steam VN',
        items: ['Steam 50K', 'Steam 100K', 'Steam 200K', 'Steam 500K']
      },
      {
        title: 'Nạp Steam USD',
        items: ['Steam $5', 'Steam $10', 'Steam $20', 'Steam $50', 'Steam $100']
      },
      {
        title: 'Steam Code',
        items: ['Code PUBG', 'Code Battle Pass', 'Code Season Pass', 'Code DLC']
      }
    ],
    featured: {
      title: 'Ưu đãi Steam Wallet',
      image: 'https://cdn.akamai.steamstatic.com/steam/apps/578080/header.jpg',
      items: ['Giảm 20% Steam Wallet', 'Tặng Code PUBG', 'Ưu đãi nạp lần đầu']
    }
  },
  'PUBG: BATTLEGROUNDS': {
    icon: <SportsEsportsIcon />,
    subcategories: [
      {
        title: 'G-Coin PUBG',
        items: ['1000 G-Coin', '2000 G-Coin', '5000 G-Coin', '10000 G-Coin']
      },
      {
        title: 'Battle Pass',
        items: ['Premium Pass', 'Premium Pass Plus', 'Level Up Pass']
      },
      {
        title: 'PUBG Items',
        items: ['Survivor Pass', 'Special Loot Box', 'Premium Crate']
      }
    ],
    featured: {
      title: 'Khuyến mãi PUBG',
      image: 'https://wallpapercave.com/wp/wp11796155.jpg',
      items: ['Bonus 50% G-Coin', 'Battle Pass Bundle', 'Premium Crate Key']
    }
  }
};

const Header = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const { totalItems, isShaking } = useCart();

  const handleMenuEnter = useCallback((e: React.MouseEvent<HTMLElement>, category: string) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(category);
  }, []);

  const handleNavigation = useCallback((path: string) => {
    router.push(path);
  }, [router]);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = ['Trang chủ', 'Nạp Game', 'Hướng dẫn', 'Liên hệ'];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: isScrolled
          ? 'rgba(255, 255, 255, 0.85)'
          : 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(10px)',
        boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          minHeight: isScrolled ? '64px' : '80px',
          transition: 'all 0.3s ease-in-out',
        }}
      >
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleMobileMenu}
            sx={{
              color: 'primary.main',
              transition: 'transform 0.2s ease',
              '&:hover': {
                transform: 'rotate(180deg)'
              }
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          variant="h6"
          component="div"
          sx={{
            color: 'primary.main',
            fontWeight: 900,
            flexGrow: isMobile ? 0 : 1,
            fontSize: isScrolled ? '1.15rem' : '1.25rem',
            transition: 'all 0.3s ease-in-out',
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
          }}
        >
          StannL Shop
        </Typography>

        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 4 }}>
            {Object.entries(menuData).map(([category, data]) => (
              <Box key={category}>
                <Button
                  color="primary"
                  onMouseEnter={(e) => {
                    setAnchorEl(e.currentTarget);
                    setOpenMenu(category);
                  }}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}
                >
                  {data.icon}
                  {category}
                  <ArrowDownIcon sx={{ fontSize: 16 }} />
                </Button>
                <Popper
                  open={openMenu === category}
                  anchorEl={anchorEl}
                  placement="bottom-start"
                  transition
                  sx={{ zIndex: 1500 }}
                >
                  {({ TransitionProps }) => (
                    <ClickAwayListener onClickAway={() => setOpenMenu(null)}>
                      <Fade {...TransitionProps} timeout={350}>
                        <Paper
                          elevation={0}
                          sx={{
                            mt: 1,
                            width: 800,
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: 2,
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          <Box sx={{ p: 3 }}>
                            <Grid container spacing={2}>
                              <Grid sx={{ flex: '0 0 66.666667%' }}>
                                <Grid container spacing={4}>
                                  {data.subcategories.map((sub) => (
                                    <Grid sx={{ flex: '0 0 33.333333%' }} key={sub.title}>
                                      <Typography
                                        variant="subtitle1"
                                        sx={{
                                          fontWeight: 600,
                                          mb: 1,
                                          color: 'primary.main'
                                        }}
                                      >
                                        {sub.title}
                                      </Typography>
                                      <List dense disablePadding>
                                        {sub.items.map((item) => (
                                          <ListItem
                                            key={item}
                                            disablePadding
                                            onClick={() => handleNavigation(`/${category.toLowerCase()}/${item.toLowerCase().replace(/ /g, '-')}`)}
                                            sx={{
                                              mb: 0.5,
                                              '&:hover': {
                                                '& .MuiTypography-root': {
                                                  color: 'primary.main'
                                                },
                                                '& .MuiSvgIcon-root': {
                                                  opacity: 1
                                                }
                                              }
                                            }}
                                          >
                                            <Typography
                                              variant="body2"
                                              sx={{
                                                transition: 'all 0.2s ease',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.5,
                                                cursor: 'pointer'
                                              }}
                                            >
                                              {item}
                                              <ChevronRightIcon
                                                sx={{
                                                  fontSize: 16,
                                                  opacity: 0,
                                                  transition: 'all 0.2s ease'
                                                }}
                                              />
                                            </Typography>
                                          </ListItem>
                                        ))}
                                      </List>
                                    </Grid>
                                  ))}
                                </Grid>
                              </Grid>
                              <Grid sx={{ flex: '0 0 33.333333%' }}>
                                <Box
                                sx={{
                                  p: 2,
                                  background: 'rgba(0, 0, 0, 0.02)',
                                  borderRadius: 1,
                                  height: '100%'
                                }}
                              >
                                <Typography
                                  variant="subtitle1"
                                  sx={{ fontWeight: 600, mb: 2 }}
                                >
                                  {data.featured.title}
                                </Typography>
                                <Box
                                  component="img"
                                  src={data.featured.image}
                                  sx={{
                                    width: '100%',
                                    height: 150,
                                    objectFit: 'cover',
                                    borderRadius: 1,
                                    mb: 2
                                  }}
                                />
                                <List dense disablePadding>
                                  {data.featured.items.map((item) => (
                                    <ListItem
                                      key={item}
                                      disablePadding
                                      onClick={() => handleNavigation(`/${category.toLowerCase()}/${item.toLowerCase().replace(/ /g, '-')}`)}
                                      sx={{
                                        mb: 0.5,
                                        cursor: 'pointer',
                                        '&:hover': {
                                          color: 'primary.main'
                                        }
                                      }}
                                    >
                                      <Typography variant="body2">
                                        {item}
                                      </Typography>
                                    </ListItem>
                                  ))}
                                </List>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </Paper>
                      </Fade>
                    </ClickAwayListener>
                  )}
                </Popper>
              </Box>
            ))}
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {!isMobile && menuItems.map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(/ /g, '-')}`}
              style={{ textDecoration: 'none' }}
            >
              <Button
                color="primary"
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  px: 2,
                  position: 'relative',
                  color: 'inherit',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    width: 0,
                    height: '2px',
                    backgroundColor: 'primary.main',
                    transition: 'all 0.3s ease',
                    transform: 'translateX(-50%)',
                  },
                  '&:hover': {
                    backgroundColor: 'transparent',
                    '&::after': {
                      width: '80%',
                    }
                  }
                }}
              >
                {item}
              </Button>
            </Link>
          ))}
          <CartButton
            onClick={() => handleNavigation('/cart')}
            color="primary"
            isShaking={isShaking}
            sx={{
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)'
              }
            }}
          >
            <Badge
              badgeContent={totalItems}
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '0.75rem',
                  minWidth: '18px',
                  height: '18px',
                  padding: '0 4px'
                }
              }}
            >
              <CartIcon />
            </Badge>
          </CartButton>
        </Box>


        <Drawer
          anchor="left"
          open={mobileMenuOpen}
          onClose={toggleMobileMenu}
        >
          <Box
            sx={{
              width: 250,
              pt: 2,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              height: '100%'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2 }}>
              <IconButton
                onClick={toggleMobileMenu}
                sx={{
                  '&:hover': {
                    transform: 'rotate(90deg)',
                    transition: 'transform 0.3s ease'
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <List>
              {menuItems.map((item) => (
                <ListItem
                  key={item}
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      transform: 'translateX(8px)'
                    }
                  }}
                >
                  <ListItemText
                    primary={
                      <Link
                        href={`/${item.toLowerCase().replace(/ /g, '-')}`}
                        style={{
                          textDecoration: 'none',
                          color: 'inherit',
                          display: 'block',
                          width: '100%',
                          padding: '8px 0'
                        }}
                      >
                        {item}
                      </Link>
                    }
                    primaryTypographyProps={{
                      sx: {
                        fontWeight: 500
                      }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Toolbar>

      {isMobile && (
        <Toolbar
          sx={{
            py: 1,
            px: 2,
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(5px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.3)',
            transition: 'all 0.3s ease'
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                router.push(`/search?q=${encodeURIComponent(searchValue)}`);
              }
            }}
            placeholder="Tìm Steam Wallet, Steam Code, G-Coin PUBG..."
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '50px',
                background: 'rgba(255, 255, 255, 0.8)',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(5px)',
                '&:hover, &.Mui-focused': {
                  background: 'rgba(255, 255, 255, 0.95)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
                }
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none'
              }
            }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => {
                    if (searchValue.trim()) {
                      router.push(`/search?q=${encodeURIComponent(searchValue)}`);
                    }
                  }}
                  sx={{
                    color: 'primary.main',
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                >
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