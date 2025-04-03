import React, { useEffect, useState } from 'react';
import { Box, keyframes } from '@mui/material';

interface CartAnimationProps {
  startPosition: { x: number; y: number };
  onComplete: () => void;
}

const flyToCart = (startX: number, startY: number) => keyframes`
  0% {
    transform: translate(${startX}px, ${startY}px) scale(1);
    opacity: 1;
  }
  75% {
    opacity: 0.7;
  }
  100% {
    transform: translate(calc(100vw - 60px), 20px) scale(0.3);
    opacity: 0;
  }
`;

const CartAnimation: React.FC<CartAnimationProps> = ({ startPosition, onComplete }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onComplete();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!show) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        width: '50px',
        height: '50px',
        bgcolor: 'primary.main',
        borderRadius: '50%',
        animation: `${flyToCart(startPosition.x, startPosition.y)} 1s ease-out forwards`,
      }}
    />
  );
};

export default CartAnimation;