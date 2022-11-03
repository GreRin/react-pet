import React from 'react';
import './RepoCard.scss';
import { IRepo } from '../../../models/models';

const RepoCard = ({ repo }: { repo: IRepo }): any => {
  return (
    <div className="card my-2">
      <a href={repo.html_url} target="_blank">
        <div className="card-header">{repo.full_name}</div>
        <div className="card-body">
          <p className="card-text">
            Forks: <span className="card-text fw-bold me-2">{repo?.forks}</span>
            Watchers: <span className="fw-bold">{repo?.watchers}</span>
          </p>
          <p className="card-text">{repo?.description}</p>
        </div>
      </a>
    </div>
  );
};

export default RepoCard;
