import { useState } from 'react';

export const useSort = (data: any, config: any): any => {
  const [sortOrder, setSortorder] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);

  const setSortColumn = (label: string): void => {
    if (sortBy && label !== sortBy) {
      setSortorder('asc');
      setSortBy(label);
      return;
    }

    if (sortOrder === null) {
      setSortorder('asc');
      setSortBy(label);
    } else if (sortOrder === 'asc') {
      setSortorder('desc');
      setSortBy(label);
    } else if (sortOrder === 'desc') {
      setSortorder(null);
      setSortBy(null);
    }
  };

  // Only sort data if sortOrder && sortBy are not null
  // Make a copy of the 'data' prop
  // Find the correct sortValue function and use it for sort
  let sortedData = data;
  if (sortOrder && sortBy) {
    const { sortValue } = config.find((column: any) => column.label === sortBy);
    sortedData = [...data].sort((a, b): any => {
      const valueA = sortValue(a);
      const valueB = sortValue(b);

      const reverseOrder = sortOrder === 'asc' ? 1 : -1;

      if (typeof valueA === 'string') {
        return valueA.localeCompare(valueB) * reverseOrder;
      } else {
        return (valueA - valueB) * reverseOrder;
      }
    });
  }

  return { sortOrder, sortBy, sortedData, setSortColumn };
};
