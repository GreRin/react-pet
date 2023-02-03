import { removeUser } from '../../store/thunks/removeUser';
import useThunk from '../../hooks/thunk.hook';
import { Button } from 'react-bootstrap';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import './UsersListItem.scss';
import { IUser } from '../../interfaces';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import ExpandablePanel from '../../common/expandable-panel/ExpandablePanel';
import AlbumsList from '../../common/albums-list/AlbumList';

const UsersListItem = ({ user, handleState }: any): JSX.Element => {
  const [doRemoveUser, isDeletingUser, error] = useThunk(removeUser({ user }));
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async (item: IUser): Promise<void> => {
    try {
      await dispatch(removeUser({ item }));
      await handleState(item);
    } catch (err) {
      toast.error(err.message, { position: 'bottom-right' });
    }
  };

  const header = (
    <>
      <Button className="delete-icon-btn btn-danger p-0" onClick={() => handleDelete(user)}>
        <MdOutlineDeleteOutline size={25} />
      </Button>
      {error && <div>Error deleting user.</div>}
      <div className="d-flex p-2 justify-content-between align-items-center">{user.email}</div>
    </>
  );

  const children = (
    <>
      <AlbumsList user={user} />
    </>
  );

  return <ExpandablePanel header={header} children={children} />;
};

export default UsersListItem;
