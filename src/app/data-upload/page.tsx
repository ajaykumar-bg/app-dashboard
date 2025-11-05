import { Container, Typography, Paper, Box } from '@mui/material';
import Navbar from '../../components/Navbar';

export default function DataUploadPage() {
  return (
    <>
      <Navbar />
      <Container maxWidth={false} sx={{ padding: 2 }}>
        <Box sx={{ width: '100%', px: { xs: 1, sm: 2, lg: 3 }, py: { xs: 1, lg: 2 } }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Data Upload
          </Typography>
          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="body1">
              Data upload functionality will be implemented here.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </>
  );
}