import { Container } from '@mui/material';
import Navbar from '../components/Navbar';
import Dashboard from '../features/dashboard/Dashboard';

export default function Home() {
  return (
    <>
      <Navbar />
      <Container maxWidth={false} sx={{ padding: 2 }}>
        <Dashboard />
      </Container>
    </>
  );
}
