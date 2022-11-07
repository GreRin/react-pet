import React, { useState } from 'react';
import { useFetchBreedsQuery } from '../../features/dog/dog-api-slice';

export const LinksPage = (): any => {
  const [numDogs, setNumDogs] = useState(10);
  const { data = [], isFetching } = useFetchBreedsQuery(numDogs);

  return (
    <div>
      <h1>Links Page</h1>
      <div>
        <p>Dogs to fetch:</p>
        <select value={numDogs} onChange={(e) => setNumDogs(Number(e.target.value))}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="30">30</option>
          <option value="35">35</option>
        </select>
      </div>
      <p>Number of dog fetched: {data.length}</p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {data.map((breed) => (
            <tr key={breed.id}>
              <td>{breed.id}</td>
              <td>
                <img src={breed.image.url} alt={breed.name} height={250} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
