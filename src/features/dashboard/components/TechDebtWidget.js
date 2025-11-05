import { Paper, Typography, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../context/DashboardContext';
import {
  getColorFromColorPath,
  getGaugeColor,
} from '../../../common/utils/commonUtils';
import { useMemo } from 'react';

export const TechDebtWidget = () => {
  const navigate = useNavigate();
  const { data } = useDashboard();

  const { techDebt } = data;

  const progressColor = useMemo(() => {
    return getColorFromColorPath(
      getGaugeColor(techDebt?.reductionPercentage || 0, 'debt')
    );
  }, [techDebt?.reductionPercentage]);

  const handleClick = () => {
    navigate('/tech-debt-details');
  };

  return (
    <Paper
      sx={{
        p: 2,
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
        },
      }}
      onClick={handleClick}
    >
      <Typography variant='h6' gutterBottom>
        Tech Debt Reduction
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 2,
        }}
      >
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress
            variant='determinate'
            value={techDebt?.reductionPercentage || 0}
            size={120}
            thickness={6}
            sx={{
              color: progressColor,
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant='h4'
              component='div'
              color='text.secondary'
              sx={{ fontWeight: 'bold' }}
            >
              {`${Math.round(techDebt?.reductionPercentage || 0)}%`}
            </Typography>
          </Box>
        </Box>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ mt: 1, textAlign: 'center' }}
        >
          Current Progress
        </Typography>
      </Box>
    </Paper>
  );
};
