import React, { useEffect, useRef, useState } from 'react';
import './HomePage.scss';
import { useLazyGetUsersRepoQuery, useSearchUsersQuery } from '../../store/github/github.api';
import { useDebounce } from '../../hooks/debounce';
import RepoCard from './repo-card/RepoCard';
import Dropdown from '../common/dropdown/Dropdown';
import { IOption } from '../../interfaces';
import ToastNotification from '../common/toast/Toast';
import { Button } from 'react-bootstrap';

const Home = (): any => {
  const [search, setSearch] = useState('react');
  const [selection, setSelection] = useState<IOption | null>(null);
  const debounced = useDebounce(search);
  const [dropdown, setDropdown] = useState(false);
  const { isLoading, isError, data } = useSearchUsersQuery(search);
  const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUsersRepoQuery();
  const toastRef = useRef();

  useEffect(() => {
    fetchRepos('angular');
    setDropdown(debounced.length > 3 && data?.length! > 0);
  }, [debounced, data, fetchRepos]);

  const clickHandler = (username: string): any => {
    fetchRepos(username);
    setDropdown(false);
  };

  const options: IOption[] = [
    { label: 'Not spicy', value: 'mild' },
    { label: 'A little spicy', value: 'spicy' },
    { label: 'Really spicy', value: 'extra_spicy' },
  ];

  const handleSelect = (item: IOption): void => {
    setSelection(item);
  };

  return (
    <>
      <div className="d-flex main">
        <aside className="aside">
          {isError && <p className="text-center bg-danger">Something went wrong ...</p>}
          <Dropdown options={options} value={selection} onChange={handleSelect} />
          <Button
            className="m-3"
            onClick={() => {
              // @ts-ignore
              toastRef.current.show();
            }}
          >
            Show Modal
          </Button>
          <ToastNotification ref={toastRef} messageData="Hello my dear friend!"></ToastNotification>
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
