import React, { Fragment } from 'react';
import { IBreed } from '../../../interfaces';

export const Table = ({ data, config }: any): any => {
  const renderHeaders = config.map((column: any) => {
    if (column.header) {
      return <Fragment key={column.id}>{column.header()}</Fragment>;
    }
    return (
      <th scope="col" key={column.id}>
        {column.label}
      </th>
    );
  });

  const renderRows = data.map((item: IBreed) => {
    const renderCells = config.map((column: any) => {
      return <td key={column.label}>{column.render(item)}</td>;
    });
    return <tr key={item.id}>{renderCells}</tr>;
  });

  return (
    <div className="position-relative m-3">
      <h1 className="mb-3">Breed</h1>
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>{renderHeaders}</tr>
        </thead>
        <tbody>{renderRows}</tbody>
      </table>
    </div>
  );
};

export default Table;
