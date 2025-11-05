// Format numbers for display
export const formatDisplayNumber = (num) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num?.toString() || '0';
};

// Parse formatted number back to numeric value
export const parseFormattedNumber = (formatted) => {
  if (typeof formatted === 'number') return formatted;
  if (!formatted || typeof formatted !== 'string') return 0;

  const numStr = formatted.replace(/[^\d.-]/g, '');
  const num = parseFloat(numStr);

  if (formatted.includes('M')) return Math.round(num * 1000000);
  if (formatted.includes('K')) return Math.round(num * 1000);
  return num || 0;
};

// Validate numeric input
export const validateNumericInput = (value, min = 0, max = Infinity) => {
  const num = Number(value);
  if (isNaN(num)) return false;
  return num >= min && num <= max;
};

// Generate years array for dropdowns
export const generateYearOptions = (startYear = 2024, endYear = 2030) => {
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year.toString());
  }
  return years;
};

// Product roadmap type options
export const productRoadmapTypes = ['Re-Platform', 'Upgrade'];

// Service scope types
export const serviceScopeTypes = ['Executions', 'Operations', 'Analysis'];

// AI Index types
// AI Index types removed - now using individual metrics

// Memory unit options
export const memoryUnits = ['GB', 'TB', 'MB'];

// Time unit options
export const timeUnits = ['Seconds', 'Minutes', 'Hours'];

// Default form validation messages
export const validationMessages = {
  required: 'This field is required',
  numeric: 'Must be a valid number',
  min: (min) => `Must be at least ${min}`,
  max: (max) => `Must be at most ${max}`,
  range: (min, max) => `Must be between ${min} and ${max}`,
};

// Helper to get nested object value by path
export const getNestedValue = (obj, path) => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

// Helper to set nested object value by path
export const setNestedValue = (obj, path, value) => {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((current, key) => {
    if (!current[key]) current[key] = {};
    return current[key];
  }, obj);
  target[lastKey] = value;
  return obj;
};

export const getFormattedFormData = (formData) => {
  const formattedData = {
    ...formData,
    appRat: {
      totalSavings: formData.appRat.totalSavings,
      sapMobilePlatform: {
        maintenanceBase: formData.appRat.sapMobilePlatform?.maintenanceBase,
        yearlyMaintenance: formData.appRat.sapMobilePlatform?.yearlyMaintenance,
        percentageValue: formData.appRat.sapMobilePlatform?.percentageValue,
      },
      sapCEPortal: {
        computeCost: formData.appRat.sapCEPortal?.computeCost,
      },
    },
    sqlOptimization: {
      ...formData.sqlOptimization,
      performance: {
        memoryReduction: {
          value: formatDisplayNumber(
            formData.sqlOptimization.performance.memoryReduction.value
          ),
          unit: formData.sqlOptimization.performance.memoryReduction.unit,
        },
        executionTimeReduction: {
          value: formatDisplayNumber(
            formData.sqlOptimization.performance.executionTimeReduction.value
          ),
          unit: formData.sqlOptimization.performance.executionTimeReduction
            .unit,
        },
      },
    },
  };
  return formattedData;
};

// Validate a single field value by path
export const validateField = (formData, fieldPath) => {
  const keys = fieldPath.split('.');
  let value = formData;

  try {
    keys.forEach((key) => {
      value = value[key];
    });

    if (value === undefined || value === null || value === '' || isNaN(value)) {
      return 'This field is required and must be a valid number';
    }
    return null;
  } catch (error) {
    return 'This field is required';
  }
};

// Validate percentage field (0-100)
export const validatePercentage = (value) => {
  const num = Number(value);
  if (isNaN(num)) return 'Must be a valid number';
  if (num < 0 || num > 100) return 'Must be between 0 and 100';
  return null;
};

// Validate positive number
export const validatePositiveNumber = (value) => {
  const num = Number(value);
  if (isNaN(num)) return 'Must be a valid number';
  if (num < 0) return 'Must be a positive number';
  return null;
};

// Validate required string field
export const validateRequiredString = (value) => {
  if (!value || typeof value !== 'string' || !value.trim()) {
    return 'This field is required';
  }
  return null;
};

/**
 * Validate a single product roadmap item
 * @param {Object} item - The roadmap item to validate
 * @param {number} index - The index of the item in the array
 * @returns {Object} Object containing validation errors for the item
 */
export const validateRoadmapItem = (item, index) => {
  const errors = {};

  if (!item.name?.trim()) {
    errors[`productRoadmap.items.${index}.name`] = 'Item name is required';
  }
  if (!item.year?.trim()) {
    errors[`productRoadmap.items.${index}.year`] = 'Year is required';
  }
  if (!item.type?.trim()) {
    errors[`productRoadmap.items.${index}.type`] = 'Type is required';
  }

  return errors;
};

/**
 * Main form validation function for dashboard forms
 * @param {Object} formData - The complete form data object
 * @returns {Object} Object containing validation errors with field paths as keys
 */
export const validateDashboardForm = (formData) => {
  const newErrors = {};

  // Define all required numeric fields
  const numericFields = [
    'techDebt.reductionPercentage',
    'techDebt.objectDecommission.completed',
    'techDebt.objectDecommission.total',
    'techDebt.objectDecommission.percentage',
    'techDebt.unusedObjectsDecommissioning.percentage',
    'appRat.totalSavings',
    'appRat.sapMobilePlatform.maintenanceBase',
    'appRat.sapMobilePlatform.yearlyMaintenance',
    'appRat.sapCEPortal.computeCost',
    'aiIndex.adoptionRate',
    'aiIndex.hoursSaved',
    'aiIndex.dollarsSaved',
    'aiIndex.useCases',
    'vulnerabilities.customCode.detected',
    'vulnerabilities.customCode.remediated',
    'vulnerabilities.customCode.remaining',
    'vulnerabilities.sapPortal.total',
    'vulnerabilities.sapPortal.remediated',
    'vulnerabilities.sapPortal.remaining',
    'serviceScopes.ricefs',
    'serviceScopes.fioriApps',
    'serviceScopes.retrofits',
    'serviceScopes.liveCompare.count',
    'sqlOptimization.queries.analyzed',
    'sqlOptimization.queries.dispositioned',
    'sqlOptimization.queries.inProgress',
    'sqlOptimization.queries.optimized',
    'sqlOptimization.performance.memoryReduction.value',
    'sqlOptimization.performance.executionTimeReduction.value',
    'operationMetrics.created',
    'operationMetrics.active',
    'operationMetrics.closed',
  ];

  // Validate numeric fields
  numericFields.forEach((fieldPath) => {
    const error = validateField(formData, fieldPath);
    if (error) {
      newErrors[fieldPath] = error;
    }
  });

  // Validate product roadmap items
  if (
    !formData.productRoadmap?.items ||
    formData.productRoadmap.items.length === 0
  ) {
    newErrors['productRoadmap.items'] =
      'At least one product roadmap item is required';
  } else {
    formData.productRoadmap.items.forEach((item, index) => {
      const itemErrors = validateRoadmapItem(item, index);
      Object.assign(newErrors, itemErrors);
    });
  }

  return newErrors;
};

/**
 * Update a nested field in form data immutably
 * @param {Object} formData - Current form data
 * @param {string} fieldPath - Dot-notation path to the field (e.g., 'appRat.totalSavings')
 * @param {any} value - New value to set
 * @returns {Object} New form data object with updated field
 */
export const updateFormField = (formData, fieldPath, value) => {
  const newData = { ...formData };
  const keys = fieldPath.split('.');
  let current = newData;

  // Navigate to the parent of the target field, creating objects as needed
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) current[keys[i]] = {};
    // Create a copy of nested objects to maintain immutability
    current[keys[i]] = { ...current[keys[i]] };
    current = current[keys[i]];
  }

  // Set the value
  current[keys[keys.length - 1]] = value;

  // Auto-calculate App Rat percentage when maintenance base or yearly maintenance changes
  if (fieldPath.includes('appRat.sapMobilePlatform')) {
    const appRat = newData.appRat || {};
    const sapMobilePlatform = appRat.sapMobilePlatform || {};
    const base = sapMobilePlatform.maintenanceBase || 0;
    const yearly = sapMobilePlatform.yearlyMaintenance || 0;

    if (base > 0) {
      newData.appRat = {
        ...appRat,
        sapMobilePlatform: {
          ...sapMobilePlatform,
          percentageValue: parseFloat(((yearly / base) * 100).toFixed(2)),
        },
      };
    }
  }

  return newData;
};

/**
 * Update a product roadmap item immutably
 * @param {Object} formData - Current form data
 * @param {number} index - Index of the item to update
 * @param {Object} item - New item data
 * @returns {Object} New form data object with updated roadmap item
 */
export const updateRoadmapItem = (formData, index, item) => {
  return {
    ...formData,
    productRoadmap: {
      ...formData.productRoadmap,
      items: formData.productRoadmap.items.map((existing, i) =>
        i === index ? item : existing
      ),
    },
  };
};

/**
 * Add a new product roadmap item
 * @param {Object} formData - Current form data
 * @param {Object} item - New item to add
 * @returns {Object} New form data object with added roadmap item
 */
export const addRoadmapItem = (formData, item) => {
  return {
    ...formData,
    productRoadmap: {
      ...formData.productRoadmap,
      items: [...formData.productRoadmap.items, item],
    },
  };
};

/**
 * Remove a product roadmap item
 * @param {Object} formData - Current form data
 * @param {number} index - Index of the item to remove
 * @returns {Object} New form data object with removed roadmap item
 */
export const removeRoadmapItem = (formData, index) => {
  return {
    ...formData,
    productRoadmap: {
      ...formData.productRoadmap,
      items: formData.productRoadmap.items.filter((_, i) => i !== index),
    },
  };
};

/**
 * Clear error for a specific field path
 * @param {Object} errors - Current errors object
 * @param {string} fieldPath - Field path to clear error for
 * @returns {Object} New errors object with cleared field error
 */
export const clearFieldError = (errors, fieldPath) => {
  if (!errors[fieldPath]) return errors;

  const newErrors = { ...errors };
  delete newErrors[fieldPath];
  return newErrors;
};
