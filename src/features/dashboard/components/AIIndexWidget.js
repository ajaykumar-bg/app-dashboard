import React from 'react';
import { Paper, Typography, Box, Grid } from '@mui/material';
import { useDashboard } from '../context/DashboardContext';

export const AIIndexWidget = () => {
  const { data } = useDashboard();

  const { aiIndex } = data;

  return (
    <Paper
      sx={{
        p: { xs: 1.5, sm: 2 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant='h6' gutterBottom sx={{ mb: 1.5 }}>
        AI Index
      </Typography>

      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid size={{ xs: 6 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant='h4'
              sx={{
                fontWeight: 'bold',
                fontSize: '1.5rem',
                color: 'primary.main',
                lineHeight: 1,
              }}
            >
              {aiIndex?.adoptionRate}%
            </Typography>
            <Typography
              variant='caption'
              color='text.secondary'
              sx={{ fontSize: '0.75rem' }}
            >
              Adoption Rate
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant='h4'
              sx={{
                fontWeight: 'bold',
                fontSize: '1.5rem',
                color: 'success.main',
                lineHeight: 1,
              }}
            >
              {aiIndex?.hoursSaved?.toLocaleString()}
            </Typography>
            <Typography
              variant='caption'
              color='text.secondary'
              sx={{ fontSize: '0.75rem' }}
            >
              Hours Saved
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant='h4'
              sx={{
                fontWeight: 'bold',
                fontSize: '1.5rem',
                color: 'warning.main',
                lineHeight: 1,
              }}
            >
              {aiIndex?.dollarsSaved}
            </Typography>
            <Typography
              variant='caption'
              color='text.secondary'
              sx={{ fontSize: '0.75rem' }}
            >
              Total Dollars Saved
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant='h4'
              sx={{
                fontWeight: 'bold',
                fontSize: '1.5rem',
                color: 'info.main',
                lineHeight: 1,
              }}
            >
              {aiIndex?.useCases}
            </Typography>
            <Typography
              variant='caption'
              color='text.secondary'
              sx={{ fontSize: '0.75rem' }}
            >
              Use Cases
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
