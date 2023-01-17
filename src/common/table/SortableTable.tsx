import React, { useState } from 'react';
import Table from '../../common/table/Table';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import './SortableTable.scss';

const getIcons = (label: string, sortBy: string | null, sortOrder: string | null): any => {
  if (label !== sortBy) {
    return (
      <div>
        <GoTriangleUp />
        <GoTriangleDown />
      </div>
    );
  }

  if (sortOrder === null) {
    return (
      <div>
        <GoTriangleUp />
        <GoTriangleDown />
      </div>
    );
  } else if (sortOrder === 'asc') {
    return (
      <div>
        <GoTriangleUp />
      </div>
    );
  } else if (sortOrder === 'desc') {
    return (
      <div>
        <GoTriangleDown />
      </div>
    );
  }
};

export const SortableTable = (props: any): any => {
  const [sortOrder, setSortorder] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);

  const { data, config } = props;

  const handleClick = (label: string): void => {
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

  const updateConfig = config.map((column: any) => {
    if (!column.sortValue) {
      return column;
    }

    return {
      ...column,
      header: () => (
        <th
          className="table-header__sorted"
          onClick={() => {
            handleClick(column.label);
          }}
        >
          <div className="d-flex align-items-center">
            {getIcons(column.label, sortBy, sortOrder)}
            {column.label} IS SORTABLE
          </div>
        </th>
      ),
    };
  });

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

  return <Table {...props} data={sortedData} config={updateConfig} />;
};

export default SortableTable;
