import React, { useEffect, useState } from 'react';
import './HomePage.scss';
import { useLazyGetUserQueryQuery, useSearchUsersQuery } from '../../store/github/github.api';
import { useDebounce } from '../../hooks/debounce';
import RepoCard from './repo-card/RepoCard';

const Home = (): any => {
  const [search, setSearch] = useState('');
  const debounced = useDebounce(search);
  const [dropdown, setDropdown] = useState(false);
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserQueryQuery();

  useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 0);
  }, [debounced, data]);

  const clickHandler = (username: string): any => {
    fetchRepos(username);
    setDropdown(false);
  };

  return (
    <section className="section">
      <h2>Home page</h2>
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
          <ul className="list-group absolute shadow bg-light w-auto">
            {isLoading && <p>Loading ...</p>}
            {data?.map((user) => (
              <li key={user.id} className="list-group__items py-2 px-4" onClick={() => clickHandler(user.login)}>
                {user.login}
              </li>
            ))}
          </ul>
        )}
        {areReposLoading && <div className="container">Repos are loading...</div>}
        {repos?.map((repo) => (
          <RepoCard repo={repo} key={repo.id} />
        ))}
      </div>
    </section>
  );
};

export default Home;
