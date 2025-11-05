import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Grid,
  Button,
  IconButton,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  Alert,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useDashboardForms } from '../context/DashboardFormsContext';
import {
  productRoadmapTypes,
  generateYearOptions,
} from '../utils/dashboardFormsUtils';

const ProductRoadmapForm = () => {
  const {
    formData,
    errors,
    addProductRoadmapItem,
    removeProductRoadmapItem,
    updateProductRoadmapItem,
  } = useDashboardForms();

  const [newItem, setNewItem] = useState({
    name: '',
    year: '2025',
    type: 'Re-Platform',
  });

  const yearOptions = generateYearOptions(2024, 2030);

  const handleAddItem = () => {
    if (newItem.name.trim()) {
      addProductRoadmapItem({ ...newItem });
      setNewItem({
        name: '',
        year: '2025',
        type: 'Re-Platform',
      });
    }
  };

  const handleUpdateItem = (index, field, value) => {
    const updatedItem = {
      ...formData.productRoadmap.items[index],
      [field]: value,
    };
    updateProductRoadmapItem(index, updatedItem);
  };

  const handleNewItemChange = (field, value) => {
    setNewItem((prev) => ({ ...prev, [field]: value }));
  };

  // Group items by year for better visualization
  const itemsByYear = formData.productRoadmap.items.reduce(
    (acc, item, index) => {
      if (!acc[item.year]) acc[item.year] = [];
      acc[item.year].push({ ...item, originalIndex: index });
      return acc;
    },
    {}
  );

  const sortedYears = Object.keys(itemsByYear).sort();

  return (
    <Card>
      <CardHeader
        title='Product Roadmap'
        subheader='Manage product roadmap items with timeline and categorization'
      />
      <CardContent>
        {/* Add New Item Form */}
        <Box sx={{ mb: 3, p: 2, borderRadius: 1 }}>
          <Typography variant='h6' gutterBottom>
            Add New Roadmap Item
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label='Item Name'
                value={newItem.name}
                onChange={(e) => handleNewItemChange('name', e.target.value)}
                fullWidth
                placeholder='e.g., Live Compare'
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Year</InputLabel>
                <Select
                  value={newItem.year}
                  onChange={(e) => handleNewItemChange('year', e.target.value)}
                  label='Year'
                >
                  {yearOptions.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={newItem.type}
                  onChange={(e) => handleNewItemChange('type', e.target.value)}
                  label='Type'
                >
                  {productRoadmapTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={handleAddItem}
            disabled={!newItem.name.trim()}
          >
            Add Item
          </Button>
        </Box>

        {/* Error Display */}
        {errors['productRoadmap.items'] && (
          <Alert severity='error' sx={{ mb: 2 }}>
            {errors['productRoadmap.items']}
          </Alert>
        )}

        {/* Current Items Display */}
        <Typography variant='h6' gutterBottom>
          Current Roadmap Items ({formData.productRoadmap.items.length})
        </Typography>

        {formData.productRoadmap.items.length === 0 ? (
          <Alert severity='info' sx={{ mt: 2 }}>
            No roadmap items added yet. Add your first item above.
          </Alert>
        ) : (
          sortedYears.map((year) => (
            <Box key={year} sx={{ mb: 3 }}>
              <Typography variant='h6' sx={{ mb: 2, color: 'primary.main' }}>
                {year}
              </Typography>

              <Grid container spacing={2}>
                {itemsByYear[year].map((item) => (
                  <Grid size={{ xs: 12 }} key={item.originalIndex}>
                    <Box
                      sx={{
                        p: 2,
                        border: 1,
                        borderRadius: 1,
                        bgcolor: 'background.paper',
                      }}
                    >
                      <Grid container spacing={2} alignItems='center'>
                        <Grid size={{ xs: 12, md: 4 }}>
                          <TextField
                            label='Item Name'
                            value={item.name}
                            onChange={(e) =>
                              handleUpdateItem(
                                item.originalIndex,
                                'name',
                                e.target.value
                              )
                            }
                            error={
                              !!errors[
                                `productRoadmap.items.${item.originalIndex}.name`
                              ]
                            }
                            helperText={
                              errors[
                                `productRoadmap.items.${item.originalIndex}.name`
                              ]
                            }
                            fullWidth
                            size='small'
                          />
                        </Grid>

                        <Grid size={{ xs: 12, md: 2 }}>
                          <FormControl fullWidth size='small'>
                            <InputLabel>Year</InputLabel>
                            <Select
                              value={item.year}
                              onChange={(e) =>
                                handleUpdateItem(
                                  item.originalIndex,
                                  'year',
                                  e.target.value
                                )
                              }
                              label='Year'
                            >
                              {yearOptions.map((yearOption) => (
                                <MenuItem key={yearOption} value={yearOption}>
                                  {yearOption}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                          <FormControl fullWidth size='small'>
                            <InputLabel>Type</InputLabel>
                            <Select
                              value={item.type}
                              onChange={(e) =>
                                handleUpdateItem(
                                  item.originalIndex,
                                  'type',
                                  e.target.value
                                )
                              }
                              label='Type'
                            >
                              {productRoadmapTypes.map((type) => (
                                <MenuItem key={type} value={type}>
                                  {type}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid size={{ xs: 12, md: 2 }}>
                          <Chip
                            label={item.type}
                            color={
                              item.type === 'Re-Platform'
                                ? 'primary'
                                : item.type === 'Upgrade'
                                ? 'success'
                                : 'warning'
                            }
                            size='small'
                            sx={{ mr: 1 }}
                          />
                        </Grid>

                        <Grid size={{ xs: 12, md: 1 }}>
                          <IconButton
                            color='error'
                            onClick={() =>
                              removeProductRoadmapItem(item.originalIndex)
                            }
                            size='small'
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default ProductRoadmapForm;
