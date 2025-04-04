'use client';
"use client";
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  endTime: Date;
}

const CountdownTimer = ({ endTime }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #ff0844 0%, #ff4563 100%)',
        color: 'white',
        borderRadius: 2,
        px: 2,
        py: 1,
        minWidth: 45,
        textAlign: 'center',
        boxShadow: '0 4px 12px rgba(255, 8, 68, 0.3)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 16px rgba(255, 8, 68, 0.4)',
        },
        '@keyframes pulse': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' }
        }
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 900,
          lineHeight: 1,
          textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          fontSize: '1.5rem'
        }}
      >
        {value.toString().padStart(2, '0')}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          display: 'block',
          fontSize: '0.75rem',
          fontWeight: 500,
          opacity: 0.9,
          letterSpacing: '0.5px'
        }}
      >
        {label}
      </Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        p: 2,
        borderRadius: 3,
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <TimeBox value={timeLeft.hours} label="Giờ" />
      <Typography
        variant="h5"
        sx={{
          color: 'white',
          fontWeight: 900,
          textShadow: '0 0 8px rgba(255,255,255,0.5)',
          animation: 'blink 1s infinite',
          '@keyframes blink': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.5 }
          }
        }}
      >
        :
      </Typography>
      <TimeBox value={timeLeft.minutes} label="Phút" />
      <Typography
        variant="h5"
        sx={{
          color: 'white',
          fontWeight: 900,
          textShadow: '0 0 8px rgba(255,255,255,0.5)',
          animation: 'blink 1s infinite',
          '@keyframes blink': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.5 }
          }
        }}
      >
        :
      </Typography>
      <TimeBox value={timeLeft.seconds} label="Giây" />
    </Box>
  );
};

export default CountdownTimer;