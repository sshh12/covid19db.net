const newCaseFilterMappings = {
  0: 10000,
  10000: 10000,
  20000: 10000,
  30000: 10000,
  40000: 200000
};
const totalCasesFilterMappings = {
  0: 5000,
  5000: 15000,
  20000: 80000,
  100000: 400000,
  500000: 10000000
};
const totalDeathsFilterMappings = {
  0: 5000,
  5000: 5000,
  10000: 15000,
  25000: 25000,
  50000: 300000
};
const totalRecoveredFilterMappings = {
  0: 5000,
  5000: 15000,
  20000: 80000,
  100000: 400000,
  500000: 10000000
};
const totalActiveFilterMappings = {
  0: 5000,
  5000: 15000,
  20000: 30000,
  50000: 150000,
  200000: 10000000
};

export {
  newCaseFilterMappings,
  totalActiveFilterMappings,
  totalCasesFilterMappings,
  totalDeathsFilterMappings,
  totalRecoveredFilterMappings,
};