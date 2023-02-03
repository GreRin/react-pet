import ExpandablePanel from '../expandable-panel/ExpandablePanel';
import React from 'react';
import { useDeleteAlbumMutation } from '../../store/albums/albums.api';
import { Button } from 'react-bootstrap';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import './AlbumListItem.scss';

const AlbumListItem = ({ album, user }: any): JSX.Element => {
  const [deleteAlbum, removeAlbumResults] = useDeleteAlbumMutation();

  const handleDelete = async (userId: string, albumId: string): Promise<void> => {
    try {
      console.log(album, user);
      await deleteAlbum({ userId, albumId });
    } catch (err) {
      toast.error(err.message, { position: 'bottom-right' });
    }
  };

  const header = (
    <div className="d-inline-flex justify-content-between" key={album.id}>
      <Button
        className="delete-album-icon-btn btn-danger p-0 me-3 d-flex justify-content-center align-items-center"
        onClick={() => handleDelete(user.id, album._id)}
      >
        <MdOutlineDeleteOutline size={20} />
      </Button>
      Albums By {album.title}
    </div>
  );

  return (
    <ExpandablePanel key={album.id} header={header}>
      List of photos in the album
    </ExpandablePanel>
  );
};

export default AlbumListItem;
