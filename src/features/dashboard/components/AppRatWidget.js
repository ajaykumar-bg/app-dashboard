'use client';

import { Grid, Paper, Typography } from '@mui/material';
import { useDashboard } from '../context/DashboardContext';
import { useRouter } from 'next/navigation';

export const AppRatWidget = () => {
  const { data } = useDashboard();
  const router = useRouter();

  const { appRat } = data;

  const handleClick = () => {
    router.push('/app-rat-details');
  };

  return (
    <Paper
      sx={{
        p: 2,
        height: '100%',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
      onClick={handleClick}
    >
      <Typography variant='h6' gutterBottom>
        App Rat
      </Typography>
      <Grid container spacing={2} direction='column'>
        <Grid>
          <Typography variant='h2' color='success'>
            ${((appRat?.totalSavings || 0) / 1000).toFixed(0)}K
          </Typography>
          <Typography variant='body2'>Total Dollars Savings</Typography>
        </Grid>
        <Grid>
          <Typography variant='h2' color='warning'>
            $
            {(
              (appRat?.sapMobilePlatform?.yearlyMaintenance || 0) / 1000
            ).toFixed(0)}
            K
          </Typography>
          <Typography variant='body2'>SAP Mobile Platform</Typography>
        </Grid>
        <Grid>
          <Typography variant='h2' color='info'>
            ${((appRat?.sapCEPortal?.computeCost || 0) / 1000).toFixed(0)}K
          </Typography>
          <Typography variant='body2'>SAP CE Portal</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
