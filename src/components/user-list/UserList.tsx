import { useGetAllUsersQuery } from '../../store/users/user.api';

const UserList = (): JSX.Element => {
  const users = useGetAllUsersQuery('');

  console.log(users);
  return <div>User List</div>;
};

export default UserList;
