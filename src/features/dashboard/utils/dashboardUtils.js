export const getCompletionPercentage = (operationMetrics) => {
  const total =
    operationMetrics.created +
    operationMetrics.active +
    operationMetrics.closed;
  if (total === 0) return 0;
  return Math.round((operationMetrics.closed / total) * 100);
};
