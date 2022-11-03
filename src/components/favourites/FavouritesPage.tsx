import React from 'react';
import { useHubSelector } from '../../hooks/redux';

export const FavouritesPage = (): any => {
  const { favourites } = useHubSelector((state) => state.github);

  if (favourites.length === 0) return <p className="text-center">No items.</p>;

  return (
    <div className="flex justify-content-center pt-3 w-auto">
      <ul className="list-none">
        {favourites.map((f) => (
          <li key={f}>
            <a href={f} target="_blank">
              {f}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
