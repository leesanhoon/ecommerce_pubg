import React from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Link,
  IconButton,
  Divider,
  InputAdornment,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
  Phone,
  Email,
  LocationOn,
  Send,
} from '@mui/icons-material';

const Footer = () => {
  const footerLinks = {
    'Về chúng tôi': ['Giới thiệu', 'Tuyển dụng', 'Tin tức', 'Liên hệ'],
    'Hỗ trợ khách hàng': [
      'Hướng dẫn mua hàng',
      'Chính sách đổi trả',
      'Chính sách bảo hành',
      'Phương thức thanh toán',
      'Phương thức vận chuyển',
    ],
    'Chính sách': [
      'Điều khoản sử dụng',
      'Chính sách bảo mật',
      'Chính sách cookies',
      'Quy định chung',
    ],
  };

  const socialLinks = [
    { icon: <Facebook />, name: 'Facebook' },
    { icon: <Twitter />, name: 'Twitter' },
    { icon: <Instagram />, name: 'Instagram' },
    { icon: <YouTube />, name: 'YouTube' },
  ];

  return (
    <Box sx={{ bgcolor: 'grey.900', color: 'white', pt: 6, pb: 3 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {/* Company Info */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33% - 16px)' } }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              PUBG STORE
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="body2"
                sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
              >
                <LocationOn sx={{ mr: 1 }} />
                123 Đường ABC, Quận 1, TP.HCM
              </Typography>
              <Typography
                variant="body2"
                sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
              >
                <Phone sx={{ mr: 1 }} />
                1900 1234
              </Typography>
              <Typography
                variant="body2"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Email sx={{ mr: 1 }} />
                support@pubgstore.com
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.name}
                  sx={{
                    color: 'white',
                    '&:hover': { color: 'primary.main' },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Box>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <Box
              key={title}
              sx={{
                flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)', md: '1 1 calc(16.666% - 16px)' },
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontSize: '1rem' }}>
                {title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {links.map((link) => (
                  <Link
                    key={link}
                    href="#"
                    underline="hover"
                    sx={{
                      color: 'grey.400',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    {link}
                  </Link>
                ))}
              </Box>
            </Box>
          ))}

          {/* Newsletter */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(33% - 16px)' } }}>
            <Typography variant="h6" sx={{ mb: 2, fontSize: '1rem' }}>
              Đăng ký nhận thông tin
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'grey.400' }}>
              Nhận thông tin về sản phẩm mới và khuyến mãi hấp dẫn
            </Typography>
            <Box
              component="form"
              sx={{
                display: 'flex',
                gap: 1,
              }}
            >
              <TextField
                fullWidth
                placeholder="Nhập email của bạn"
                size="small"
                sx={{
                  backgroundColor: 'grey.800',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'grey.700' },
                    '&:hover fieldset': { borderColor: 'grey.600' },
                    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                  },
                  input: { color: 'white' },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        sx={{ color: 'primary.main' }}
                      >
                        <Send />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 4, borderColor: 'grey.800' }} />

        {/* Copyright */}
        <Typography
          variant="body2"
          align="center"
          sx={{ color: 'grey.500' }}
        >
          © {new Date().getFullYear()} PUBG Store. Tất cả quyền được bảo lưu.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;