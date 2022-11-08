import React, { useEffect, useState } from 'react';
import './HomePage.scss';
import { useLazyGetUsersRepoQuery, useSearchUsersQuery } from '../../store/github/github.api';
import { useDebounce } from '../../hooks/debounce';
import RepoCard from './repo-card/RepoCard';

const Home = (): any => {
  const [search, setSearch] = useState('react');
  const debounced = useDebounce(search);
  const [dropdown, setDropdown] = useState(false);
  const { isLoading, isError, data } = useSearchUsersQuery(search);
  console.log('useSearchUsersQuery', data);
  const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUsersRepoQuery();

  useEffect(() => {
    fetchRepos('angular');
    setDropdown(debounced.length > 3 && data?.length! > 0);
  }, [debounced, data, fetchRepos]);

  const clickHandler = (username: string): any => {
    fetchRepos(username);
    setDropdown(false);
  };

  return (
    <>
      <div className="d-flex main">
        <aside className="aside">
          {isError && <p className="text-center bg-danger">Something went wrong ...</p>}

          <div className="relative w-auto m-3">
            <input
              type="text"
              className="searchInput border px-4 py-2 m-2 w-auto"
              placeholder="Search for GitHub username ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {dropdown && (
              <ul className="list-group absolute shadow bg-light">
                {isLoading && <p>Loading ...</p>}
                {data?.map((user) => (
                  <li key={user.id} className="list-group__items py-2 px-4" onClick={() => clickHandler(user.login)}>
                    {user.login}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
        <div className="w-100 d-grid home-section position-relative">
          {areReposLoading && <div className="container">Repos are loading...</div>}
          {repos?.map((repo) => (
            <RepoCard repo={repo} key={repo.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
