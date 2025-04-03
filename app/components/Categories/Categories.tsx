import React from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Smartphone,
  SportsEsports,
  Headphones,
  Memory,
  Mouse,
  Keyboard,
  DevicesOther,
  Style,
} from '@mui/icons-material';

const categories = [
  { name: 'Điện thoại', icon: Smartphone },
  { name: 'Gaming Gear', icon: SportsEsports },
  { name: 'Tai nghe', icon: Headphones },
  { name: 'Linh kiện', icon: Memory },
  { name: 'Chuột', icon: Mouse },
  { name: 'Bàn phím', icon: Keyboard },
  { name: 'Phụ kiện', icon: DevicesOther },
  { name: 'Thời trang', icon: Style },
];

const Categories = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ py: 4, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          sx={{
            mb: 4,
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'primary.main',
          }}
        >
          Danh mục sản phẩm
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }, gap: 2 }}>
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Paper
                key={index}
                sx={{
                  p: 2,
                  textAlign: 'center',
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[4],
                    '& .category-icon': {
                      color: 'primary.main',
                      transform: 'scale(1.1)',
                    },
                  },
                }}
              >
                <IconComponent
                  className="category-icon"
                  sx={{
                    fontSize: isMobile ? 40 : 48,
                    mb: 1,
                    color: 'text.secondary',
                    transition: 'all 0.3s ease',
                  }}
                />
                <Typography
                  variant={isMobile ? 'body2' : 'body1'}
                  sx={{
                    fontWeight: 500,
                    color: 'text.primary',
                  }}
                >
                  {category.name}
                </Typography>
              </Paper>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default Categories;