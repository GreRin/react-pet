import React, { useState } from 'react';
import './RepoCard.scss';
import { IRepo } from '../../../models/models';
import { Button } from 'react-bootstrap';
import { useActions } from '../../../store/actions';
import { useAppSelector } from '../../../hooks/redux';

const RepoCard = ({ repo }: { repo: IRepo }): any => {
  const { addFavourite, removeFavourite } = useActions();
  const { favourites } = useAppSelector((state) => state.github);

  const [isFav, setIsFav] = useState(favourites.includes(repo.html_url));

  const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>): void => {
    addFavourite(repo.url);
    setIsFav(true);
  };

  const removeFromFavourite = (event: React.MouseEvent<HTMLButtonElement>): void => {
    removeFavourite(repo.url);
    setIsFav(false);
  };

  return (
    <div className="card m-2">
      <div className="card-header">{repo.full_name}</div>
      <div className="card-body">
        <p className="card-text">
          Forks: <span className="card-text fw-bold me-2">{repo?.forks}</span>
          Watchers: <span className="fw-bold">{repo?.watchers}</span>
        </p>
        <p className="card-text">{repo?.description}</p>
      </div>
      {!isFav && (
        <Button className="btn-warning py-2 px-4 ms-3 mb-3 rounded" onClick={addToFavourite}>
          Add
        </Button>
      )}
      {isFav && (
        <Button className="btn-secondary py-2 px-4 ms-3 mb-3 rounded" onClick={removeFromFavourite}>
          Remove
        </Button>
      )}
    </div>
  );
};

export default RepoCard;
