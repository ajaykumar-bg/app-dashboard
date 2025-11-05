import React from 'react';
import { Box, Typography } from '@mui/material';
import AppRatMetrics from './AppRatMetrics';
import AppRatCharts from './AppRatCharts';

function AppRatDetails() {
  return (
    <Box sx={{ py: 2 }}>
      {/* App Rat Charts */}
      <Box sx={{ mb: 4 }}>
        <Typography variant='h5' component='h2' gutterBottom sx={{ mb: 2 }}>
          Cost Analytics & Savings Visualization
        </Typography>
        <AppRatCharts />
      </Box>

      {/* App Rat Metrics - Financial Overview */}
      <Box sx={{ mb: 4 }}>
        <Typography variant='h5' component='h2' gutterBottom sx={{ mb: 2 }}>
          Financial Metrics Overview
        </Typography>
        <AppRatMetrics />
      </Box>
    </Box>
  );
}

export default AppRatDetails;
