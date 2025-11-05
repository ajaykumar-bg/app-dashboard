import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Slider,
  Box,
  Grid,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useDashboardForms } from '../context/DashboardFormsContext';

const TechDebtForm = () => {
  const { formData, errors, updateField } = useDashboardForms();

  const handlePercentageChange = (event, newValue) => {
    updateField('techDebt.reductionPercentage', newValue);
  };

  const handleInputChange = (field) => (event) => {
    const value = parseInt(event.target.value) || 0;
    if (field === 'techDebt.reductionPercentage') {
      updateField(field, Math.min(100, Math.max(0, value)));
    } else {
      updateField(field, value);
    }
  };

  const handleSelectChange = (field) => (event) => {
    updateField(field, event.target.value);
  };

  return (
    <Card>
      <CardHeader
        title='Tech Debt Reduction'
        subheader='Configure technical debt reduction metrics and object decommission scope'
      />
      <CardContent>
        {/* Overall Reduction Progress */}
        <Typography variant='h6' gutterBottom sx={{ mb: 2 }}>
          Overall Progress
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography gutterBottom>
            Reduction Percentage: {formData.techDebt?.reductionPercentage || 0}%
          </Typography>
          <Slider
            value={formData.techDebt?.reductionPercentage || 0}
            onChange={handlePercentageChange}
            min={0}
            max={100}
            step={1}
            marks={[
              { value: 0, label: '0%' },
              { value: 25, label: '25%' },
              { value: 50, label: '50%' },
              { value: 75, label: '75%' },
              { value: 100, label: '100%' },
            ]}
            sx={{ mt: 2 }}
          />
        </Box>

        <TextField
          label='Reduction Percentage'
          type='number'
          value={formData.techDebt?.reductionPercentage || 0}
          onChange={handleInputChange('techDebt.reductionPercentage')}
          error={!!errors['techDebt.reductionPercentage']}
          helperText={errors['techDebt.reductionPercentage']}
          inputProps={{ min: 0, max: 100 }}
          fullWidth
          sx={{ mb: 3 }}
        />

        <Divider sx={{ mb: 3 }} />

        {/* Regional Information */}
        <Typography variant='h6' gutterBottom sx={{ mb: 2 }}>
          Regional Scope
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Primary Region</InputLabel>
              <Select
                value={formData.techDebt?.region || 'MENA+'}
                onChange={handleSelectChange('techDebt.region')}
                label='Primary Region'
              >
                <MenuItem value='MENA+'>MENA+</MenuItem>
                <MenuItem value='APAC'>APAC</MenuItem>
                <MenuItem value='EMEA'>EMEA</MenuItem>
                <MenuItem value='Americas'>Americas</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3 }} />

        {/* Object Decommission Scope */}
        <Typography variant='h6' gutterBottom sx={{ mb: 2 }}>
          Object Decommission Scope
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Completed Objects'
              type='number'
              value={formData.techDebt?.objectDecommission?.completed || 1884}
              onChange={handleInputChange(
                'techDebt.objectDecommission.completed'
              )}
              error={!!errors['techDebt.objectDecommission.completed']}
              helperText={errors['techDebt.objectDecommission.completed']}
              inputProps={{ min: 0 }}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Total Objects'
              type='number'
              value={formData.techDebt?.objectDecommission?.total || 6434}
              onChange={handleInputChange('techDebt.objectDecommission.total')}
              error={!!errors['techDebt.objectDecommission.total']}
              helperText={errors['techDebt.objectDecommission.total']}
              inputProps={{ min: 0 }}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label='Percentage (%)'
              type='number'
              value={formData.techDebt?.objectDecommission?.percentage || 29.2}
              onChange={handleInputChange(
                'techDebt.objectDecommission.percentage'
              )}
              error={!!errors['techDebt.objectDecommission.percentage']}
              helperText={errors['techDebt.objectDecommission.percentage']}
              inputProps={{ min: 0, max: 100, step: 0.1 }}
              fullWidth
            />
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3 }} />

        {/* Unused Objects Decommissioning */}
        <Typography variant='h6' gutterBottom sx={{ mb: 2 }}>
          Unused Objects Decommissioning
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label='Decommissioning Percentage'
              type='number'
              value={
                formData.techDebt?.unusedObjectsDecommissioning?.percentage ||
                100
              }
              onChange={handleInputChange(
                'techDebt.unusedObjectsDecommissioning.percentage'
              )}
              error={
                !!errors['techDebt.unusedObjectsDecommissioning.percentage']
              }
              helperText={
                errors['techDebt.unusedObjectsDecommissioning.percentage']
              }
              inputProps={{ min: 0, max: 100 }}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={
                  formData.techDebt?.unusedObjectsDecommissioning?.status ||
                  'Complete'
                }
                onChange={handleSelectChange(
                  'techDebt.unusedObjectsDecommissioning.status'
                )}
                label='Status'
              >
                <MenuItem value='Complete'>Complete</MenuItem>
                <MenuItem value='In Progress'>In Progress</MenuItem>
                <MenuItem value='Pending'>Pending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TechDebtForm;
