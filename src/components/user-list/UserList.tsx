import React, { useEffect, useRef, useState } from 'react';
import { fetchUsers } from '../../store/thunks/fetchUsers';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { IRequestStateBase } from '../../store/users/user.slice';
import Skeleton from '../skeleton/Sceleton';
import { Button } from 'react-bootstrap';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { IAuth } from '../auth-form/interface';
import * as Yup from 'yup';
import AddUserForm from '../../common/forms/AddUserForm';

const UserList = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, data, error } = useSelector((state: any): IRequestStateBase => {
    return state.users;
  });
  const refModal = useRef();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleUserAdd = (): void => {
    // dispatch(addUser());
  };

  if (isLoading) {
    return <Skeleton times={6} className="w-100" />;
  }

  if (error) {
    return <div>Error fetching data ... </div>;
  }

  const renderUsers = data.map((user) => {
    return (
      <div key={user.id} className="mb-2 w-100 card card-body border-3 rounded-3">
        <div className="d-flex p-2 justify-content-between align-items-center">{user.email}</div>
      </div>
    );
  });

  return (
    <div className="m-3 position-relative">
      <div className="d-flex justify-content-between py-3">
        <h1 className="m-0">Users</h1>
        <Button className="btn btn-warning" data-toggle="modal" data-target="#addUserModal">
          + Add User
        </Button>
      </div>
      {data && renderUsers}

      <AddUserForm refModal={refModal} />
    </div>
  );
};

export default UserList;
