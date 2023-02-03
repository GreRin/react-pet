import PhotoListItem from './PhotoListItem';
import { useFetchPhotosQuery } from '../../store/fotos/fotos.api';

const PhotoList = ({ album }: any): JSX.Element => {
  useFetchPhotosQuery(album);
  return <PhotoListItem />;
};

export default PhotoList;
