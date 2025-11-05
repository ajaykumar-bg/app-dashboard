import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const RegionMetricCard = ({ techDebt }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography variant='h6' gutterBottom color='primary'>
          Region
        </Typography>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant='h4' fontWeight='bold'>
            {techDebt?.region || 'MENA+'}
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
            Primary Focus Region
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RegionMetricCard;
