import React from 'react';
import './PhotoListItem.scss';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { useDeletePhotoMutation } from '../../../store/fotos/photos.api';

const PhotoListItem = ({ photo, albumId }: any): JSX.Element => {
  const [removePhoto, result] = useDeletePhotoMutation();

  const handleRemovePhoto = (): void => {
    console.log(photo);
    removePhoto({ photo, albumId });
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div
        className="photo d-flex flex-column position-relative justify-content-center align-items-center m-3"
        onClick={handleRemovePhoto}
      >
        <img src={photo.ref} alt={photo.title} className="" />
        <div className="delete-btn position-absolute d-flex align-items-center justify-content-center w-100 h-100">
          <MdOutlineDeleteOutline size={50} color="red" />
        </div>
      </div>
      <p className="justify-content-center">{photo.title}</p>
    </div>
  );
};

export default PhotoListItem;
