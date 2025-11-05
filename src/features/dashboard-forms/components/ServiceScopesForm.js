import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Divider,
} from '@mui/material';
import { useDashboardForms } from '../context/DashboardFormsContext';
import { serviceScopeTypes } from '../utils/dashboardFormsUtils';

const ServiceScopesForm = () => {
  const { formData, errors, updateField } = useDashboardForms();

  const handleInputChange = (field) => (event) => {
    const value = parseInt(event.target.value) || 0;
    updateField(field, value);
  };

  const handleLiveCompareTypeChange = (event) => {
    updateField('serviceScopes.liveCompare.type', event.target.value);
  };

  return (
    <Card>
      <CardHeader
        title='Service Scopes'
        subheader='Configure service scope metrics and live compare settings'
      />
      <CardContent>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <TextField
              label='RICEFs'
              type='number'
              value={formData.serviceScopes.ricefs}
              onChange={handleInputChange('serviceScopes.ricefs')}
              error={!!errors['serviceScopes.ricefs']}
              helperText={errors['serviceScopes.ricefs'] || 'RICEF count'}
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <TextField
              label='Fiori Apps'
              type='number'
              value={formData.serviceScopes.fioriApps}
              onChange={handleInputChange('serviceScopes.fioriApps')}
              error={!!errors['serviceScopes.fioriApps']}
              helperText={
                errors['serviceScopes.fioriApps'] || 'Fiori applications count'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <TextField
              label='Retrofits'
              type='number'
              value={formData.serviceScopes.retrofits}
              onChange={handleInputChange('serviceScopes.retrofits')}
              error={!!errors['serviceScopes.retrofits']}
              helperText={errors['serviceScopes.retrofits'] || 'Retrofit count'}
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Typography variant='h6' gutterBottom>
          Live Compare Settings
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              label='Live Compare Count'
              type='number'
              value={formData.serviceScopes.liveCompare.count}
              onChange={handleInputChange('serviceScopes.liveCompare.count')}
              error={!!errors['serviceScopes.liveCompare.count']}
              helperText={
                errors['serviceScopes.liveCompare.count'] ||
                'Live compare count'
              }
              fullWidth
              inputProps={{ min: 0 }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Live Compare Type</InputLabel>
              <Select
                value={formData.serviceScopes.liveCompare.type}
                onChange={handleLiveCompareTypeChange}
                label='Live Compare Type'
              >
                {serviceScopeTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ServiceScopesForm;
