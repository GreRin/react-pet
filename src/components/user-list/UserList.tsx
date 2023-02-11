import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../store/thunks/fetchUsers';
import { useSelector } from 'react-redux';
import { IRequestStateBase } from '../../store/users/user.slice';
import Skeleton from '../skeleton/Sceleton';
import { Button } from 'react-bootstrap';
import AddUserForm from '../common/forms/AddUserForm';
import useThunk from '../../hooks/thunk.hook';
import UsersListItem from './UsersListItem';
import { IUser } from '../../interfaces';

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
  let content;
  if (isLoadingUsers) {
    content = <Skeleton times={data.length} className="w-100" />;
  } else if (loadingUsersError) {
    content = <div>Error fetching data ... </div>;
  } else {
    content = data.map((user: IUser) => {
      return <UsersListItem key={user.id} user={user} handleState={handleState} />;
    });
  }

  return (
    <>
      <div className="p-3 position-relative">
        <div className="d-flex justify-content-between py-3">
          <h1 className="m-0">Users</h1>
          <Button className="btn btn-warning" type="button" onClick={() => setOpen(true)}>
            + Add User
          </Button>
        </div>
        {data && content}

        <AddUserForm isOpen={open} handleClose={() => setOpen(false)} handleState={handleState} />
      </div>
    </>
  );
};

export default UserList;
