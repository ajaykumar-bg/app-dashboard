import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useDashboard } from '../../dashboard/context/DashboardContext';

// Import components
import {
  RegionMetricCard,
  ObjectDecommissionCard,
  UnusedObjectsStatusCard,
  DecommissionProgressChart,
  TechDebtTrendChart,
  RegionalBreakdownChart,
} from './components';

const TechDebtDetails = () => {
  const { data } = useDashboard();
  const { techDebt } = data;

  return (
    <Box sx={{ py: 2 }}>
      {/* Metrics Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12 }}>
          <Typography variant='h5' gutterBottom sx={{ mb: 2 }}>
            Key Metrics
          </Typography>
        </Grid>

        <Grid container size={{ xs: 12 }} spacing={3}>
          <Grid size={{ xs: 12, md: 3 }}>
            <RegionMetricCard techDebt={techDebt} />
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <ObjectDecommissionCard techDebt={techDebt} />
          </Grid>
        </Grid>

        <UnusedObjectsStatusCard techDebt={techDebt} />
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Typography variant='h5' gutterBottom sx={{ mb: 2 }}>
            Visualization & Analytics
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <DecommissionProgressChart techDebt={techDebt} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TechDebtTrendChart techDebt={techDebt} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <RegionalBreakdownChart techDebt={techDebt} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TechDebtDetails;
