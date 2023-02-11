import { useAddAlbumMutation, useFetchAlbumsQuery } from '../../../store/albums/albums.api';
import Skeleton from '../../skeleton/Sceleton';
import { IAlbum } from '../../../interfaces';
import { Button } from 'react-bootstrap';
import React from 'react';
import AlbumListItem from './AlbumListItem';

const AlbumsList = ({ user }: any): JSX.Element => {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, result] = useAddAlbumMutation();

  const handleAddAlbum = (): void => {
    addAlbum(user);
  };

  let content;
  if (isFetching) {
    content = <Skeleton className="w-100 h-25" times={3} />;
  } else if (error) {
    content = <div>Error loading albums.</div>;
  } else {
    content = data.map((album: IAlbum) => {
      return <AlbumListItem key={album._id} album={album} user={user} />;
    });
  }

  return (
    <div className="d-flex flex-column">
      <Button className="btn btn-warning mt-3 align-self-end" type="button" onClick={handleAddAlbum}>
        + Add Album
      </Button>
      <div>{content}</div>
    </div>
  );
};

export default AlbumsList;
