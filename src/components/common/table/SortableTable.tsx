import React from 'react';
import Table from './Table';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import './SortableTable.scss';
import { useSort } from '../../../hooks/sort.hook';

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
  const { data, config } = props;
  const { sortOrder, sortBy, sortedData, setSortColumn } = useSort(data, config);

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
            setSortColumn(column.label);
          }}
        >
          <div className="d-flex align-items-center">
            {getIcons(column.label, sortBy, sortOrder)}
            {column.label}
          </div>
        </th>
      ),
    };
  });

  return <Table {...props} data={sortedData} config={updateConfig} />;
};

export default SortableTable;
