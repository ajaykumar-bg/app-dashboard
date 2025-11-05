import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';

const CostAnalysisCard = ({ appRat }) => {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Card>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            SAP Mobile Platform Cost Analysis
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 1,
            }}
          >
            <Typography variant='body2'>Maintenance Base:</Typography>
            <Typography variant='body2' fontWeight='bold'>
              $
              {(
                (appRat?.sapMobilePlatform?.maintenanceBase || 0) / 1000
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
            <Typography variant='body2'>Yearly Maintenance:</Typography>
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
            <Typography variant='body2'>Percentage (Yearly/Base):</Typography>
            <Typography variant='body2' fontWeight='bold' color='primary.main'>
              {appRat?.sapMobilePlatform?.percentageValue || 0}%
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CostAnalysisCard;
