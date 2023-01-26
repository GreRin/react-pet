import React, { useCallback, useEffect, useState } from 'react';
import { fetchUsers } from '../../store/thunks/fetchUsers';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { IRequestStateBase } from '../../store/users/user.slice';
import Skeleton from '../skeleton/Sceleton';
import { Button } from 'react-bootstrap';
import AddUserForm from '../../common/forms/AddUserForm';
import { AsyncThunkAction } from '@reduxjs/toolkit';

const useThunk = (thunk: AsyncThunkAction<any, void, {}>): any => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const runThunk = useCallback(() => {
    setIsLoading(true);
    dispatch(thunk)
      .unwrap()
      .catch((err: any) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch, thunk]);

  return [runThunk, isLoading, error];
};

const UserList = (): JSX.Element => {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers());

  const { data } = useSelector((state: any): IRequestStateBase => {
    return state.users;
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    doFetchUsers();
  }, []);

  const handleState = (): void => {
    doFetchUsers();
  };

  if (isLoadingUsers) {
    return <Skeleton times={data.length} className="w-100" />;
  }

  const renderUsers = data.map((user: any) => {
    return (
      <div key={user.id} className="mb-2 w-100 card card-body border-3 rounded-3">
        <div className="d-flex p-2 justify-content-between align-items-center">{user.email}</div>
      </div>
    );
  });

  return (
    <>
      <div className="p-3 position-relative">
        <div className="d-flex justify-content-between py-3">
          <h1 className="m-0">Users</h1>
          <Button className="btn btn-warning" type="button" onClick={() => setOpen(true)}>
            + Add User
          </Button>
        </div>
        {data && renderUsers}

        <AddUserForm isOpen={open} handleClose={() => setOpen(false)} handleState={handleState} />
      </div>
    </>
  );
};

export default UserList;
