import React from 'react';
import { useTableData } from '../../hooks/tableData.hook';
import { IBreed } from '../../interfaces';
import SortableTable from '../common/table/SortableTable';
import Counter from '../counter/Counter';

export const TablePage = (): any => {
  const { resp } = useTableData();

  const config = [
    { label: 'Name', render: (breed: IBreed) => breed.name, sortValue: (breed: IBreed) => breed.name },
    {
      label: 'Breed Group',
      render: (breed: IBreed) => breed.breed_group,
      header: () => <th>Temperament</th>,
      sortValue: (breed: IBreed) => breed.breed_group,
    },
    {
      label: 'Temperament',
      render: (breed: IBreed) => breed.temperament,
    },
    {
      label: 'Height',
      render: (breed: IBreed) => breed.height.metric,
      header: () => <th>Height</th>,
      sortValue: (breed: IBreed) => breed.height.metric,
    },
    { label: 'Country Code', render: (breed: IBreed) => breed.country_code },
    {
      label: 'Image',
      render: (breed: IBreed) => <img src={breed.image.url} alt={breed.name} width="100" height="100" />,
    },
  ];

  return (
    <div className="position-relative">
      <Counter initialCount={10} />
      <SortableTable data={resp} config={config} />
    </div>
  );
};

export default TablePage;
