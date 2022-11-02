import React from 'react';
import { useSearchUsersQuery } from '../store/github/github.api';

const Home = (): any => {
  const { isLoading, isError, data } = useSearchUsersQuery('grerin');
  return (
    <section className="section">
      <h2>Home page</h2>
    </section>
  );
};

export default Home;
