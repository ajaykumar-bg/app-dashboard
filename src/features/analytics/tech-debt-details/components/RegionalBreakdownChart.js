import React from 'react';
import { Paper, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { REGIONAL_BREAKDOWN_DATA } from '../constants';

const RegionalBreakdownChart = ({ techDebt }) => {
  return (
    <Paper sx={{ p: 3, height: '400px' }}>
      <Typography variant='h6' gutterBottom>
        Regional Breakdown
      </Typography>
      <BarChart
        width={undefined}
        height={300}
        series={[
          {
            data: REGIONAL_BREAKDOWN_DATA.progressPercentages,
            label: 'Decommission Progress (%)',
            color: '#2196f3',
          },
        ]}
        xAxis={[
          {
            data: REGIONAL_BREAKDOWN_DATA.regions,
            scaleType: 'band',
            label: 'Region',
          },
        ]}
        yAxis={[
          {
            max: 40,
            label: 'Decommission Progress (%)',
          },
        ]}
        grid={{ vertical: true, horizontal: true }}
        slotProps={{
          legend: {
            direction: 'row',
            position: { vertical: 'bottom', horizontal: 'middle' },
            padding: 0,
          },
        }}
      />
    </Paper>
  );
};

export default RegionalBreakdownChart;
