import { Container, Typography, Paper, Box } from '@mui/material';
import Navbar from '../../components/Navbar';

export default function DashboardFormsPage() {
  return (
    <>
      <Navbar />
      <Container maxWidth={false} sx={{ padding: 2 }}>
        <Box sx={{ width: '100%', px: { xs: 1, sm: 2, lg: 3 }, py: { xs: 1, lg: 2 } }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard Configuration
          </Typography>
          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="body1">
              Dashboard configuration forms will be implemented here.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </>
  );
}