import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';

const CostSummaryCard = ({ appRat }) => {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Card>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            Cost Breakdown Summary
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 1,
            }}
          >
            <Typography variant='body2'>Total Savings:</Typography>
            <Typography variant='body2' fontWeight='bold' color='success.main'>
              ${((appRat?.totalSavings || 0) / 1000).toFixed(0)}K
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 1,
            }}
          >
            <Typography variant='body2'>SAP Mobile (Yearly):</Typography>
            <Typography variant='body2' fontWeight='bold'>
              $
              {(
                (appRat?.sapMobilePlatform?.yearlyMaintenance || 0) / 1000
              ).toFixed(0)}
              K
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 1,
            }}
          >
            <Typography variant='body2'>SAP CE Portal:</Typography>
            <Typography variant='body2' fontWeight='bold'>
              ${((appRat?.sapCEPortal?.computeCost || 0) / 1000).toFixed(0)}K
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CostSummaryCard;
