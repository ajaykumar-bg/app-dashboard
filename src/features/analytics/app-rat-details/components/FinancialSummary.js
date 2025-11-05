import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { SUMMARY_COLORS } from '../constants';

const FinancialSummary = ({ appRat }) => {
  const summaryMetrics = [
    {
      value: `$${((appRat?.totalSavings || 0) / 1000).toFixed(0)}K`,
      label: 'Total Annual Savings',
      bgColor: SUMMARY_COLORS.successLight,
      textColor: SUMMARY_COLORS.successDark,
    },
    {
      value: `${appRat?.sapMobilePlatform?.percentageValue || 0}%`,
      label: 'Yearly/Base Maintenance Ratio',
      bgColor: SUMMARY_COLORS.primaryLight,
      textColor: SUMMARY_COLORS.primaryDark,
    },
    {
      value: `$${(
        ((appRat?.sapMobilePlatform?.yearlyMaintenance || 0) +
          (appRat?.sapCEPortal?.computeCost || 0)) /
        1000
      ).toFixed(0)}K`,
      label: 'Total Annual Costs',
      bgColor: SUMMARY_COLORS.warningLight,
      textColor: SUMMARY_COLORS.warningDark,
    },
  ];

  return (
    <Grid size={{ xs: 12 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant='h6' gutterBottom>
          Financial Summary & Key Metrics
        </Typography>
        <Grid container spacing={3}>
          {summaryMetrics.map((metric, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 2,
                  bgcolor: metric.bgColor,
                  borderRadius: 1,
                }}
              >
                <Typography variant='h4' color={metric.textColor}>
                  {metric.value}
                </Typography>
                <Typography variant='body2' color={metric.textColor}>
                  {metric.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default FinancialSummary;
