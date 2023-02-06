import PhotoListItem from './PhotoListItem';
import { useAddPhotoMutation, useFetchPhotosQuery } from '../../store/fotos/photos.api';
import { Button } from 'react-bootstrap';
import React from 'react';
import Skeleton from '../../components/skeleton/Sceleton';
import { IAlbum, IPhoto } from '../../interfaces';

const PhotoList = ({ album }: any): JSX.Element => {
  const { data, error, isFetching } = useFetchPhotosQuery(album);
  const [addFoto, result] = useAddPhotoMutation();

  const handleAddPhoto = (): void => {
    addFoto(album);
  };

  let content;
  if (isFetching) {
    content = <Skeleton className="w-100 h-25" times={3} />;
  } else if (error) {
    content = <div>Error loading photos.</div>;
  } else {
    content = data[0].foto.map((photo: IPhoto) => {
      return <PhotoListItem key={photo._id} photo={photo} albumId={album._id} />;
    });
  }

  return (
    <div className="d-flex flex-column">
      <Button className="btn btn-warning mt-3 align-self-end" type="button" onClick={handleAddPhoto}>
        + Add Photo
      </Button>
      <div className="d-inline-flex justify-content-center align-items-center">{content}</div>
    </div>
  );
};

export default PhotoList;
