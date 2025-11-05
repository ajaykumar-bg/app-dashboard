'use client';

import { Grid, Typography, Paper, Box } from '@mui/material';
import { useUser } from '../../shared/context/UserContext';

function Dashboard() {
  const { permissions, user } = useUser();

  return (
    <Box sx={{ width: '100%', px: { xs: 1, sm: 2, lg: 3 }, py: { xs: 1, lg: 2 } }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to SAP App Dev Scorecard
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Hello, {user.name}! You are logged in as: {user.role}
      </Typography>
      
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2, height: 200 }}>
            <Typography variant="h6">Dashboard Overview</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Your dashboard components will be displayed here.
            </Typography>
          </Paper>
        </Grid>
        
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2, height: 200 }}>
            <Typography variant="h6">Permissions</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Tech Debt: {permissions.canViewTechDebt ? '✓' : '✗'}
            </Typography>
            <Typography variant="body2">
              Vulnerabilities: {permissions.canViewVulnerabilities ? '✓' : '✗'}
            </Typography>
            <Typography variant="body2">
              SQL Optimization: {permissions.canViewSQLOptimization ? '✓' : '✗'}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;