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
        backgroundColor: 'error.main',
        color: 'white',
        borderRadius: 1,
        px: 1.5,
        py: 0.5,
        minWidth: 40,
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1 }}>
        {value.toString().padStart(2, '0')}
      </Typography>
      <Typography variant="caption" sx={{ display: 'block', fontSize: '0.7rem' }}>
        {label}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <TimeBox value={timeLeft.hours} label="Giờ" />
      <Typography variant="h6" sx={{ color: 'error.main', fontWeight: 'bold' }}>:</Typography>
      <TimeBox value={timeLeft.minutes} label="Phút" />
      <Typography variant="h6" sx={{ color: 'error.main', fontWeight: 'bold' }}>:</Typography>
      <TimeBox value={timeLeft.seconds} label="Giây" />
    </Box>
  );
};

export default CountdownTimer;