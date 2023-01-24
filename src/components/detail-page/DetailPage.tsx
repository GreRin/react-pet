import React from 'react';
import './DetailePage.scss';
import { saveAs } from 'file-saver';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import { Packer } from 'docx';
import { DocumentCreator } from './cv/cv-generator';
import { experiences, education, skills, achievements } from './cv/cv-data';
import { useGetUsersQuery } from '../../store/auth/auth.api';
import Clock from '../../shared/clock/Clock';
import withToggle from './HOC';
import MoviePlayList from '../movie-playlist/MoviePlaylist';
import { useActions } from '../../store/actions';

export const DetailPage = (): any => {
  const data = moment('11-06-2021').format('w');
  const [week, year] = [20, 2021];
  // console.log(moment(`${week} ${year}`, 'WW YYYY').format('ww'));
  const n = moment('20 2021', 'WW YYYY').startOf('isoWeek').format('DD MMM YYYY');
  // console.log(moment(n).add(1, 'w').format('DD MMM YYYY'));

  const createDocx = async (): Promise<any> => {
    const documentCreator = new DocumentCreator();
    const doc = documentCreator.create([experiences, education, skills, achievements]);

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'example.docx');
      console.log('Document created successfully');
    });
  };

  const users = useGetUsersQuery('');

  console.log(users);

  const { reset } = useActions();

  const ViewEditToggleExample = ({ toggle, toggleStatus, title }: any): any => (
    <div>
      {toggleStatus ? <input type="text" value={title} /> : <p>{title}</p>}
      <button onClick={toggle}>{toggleStatus ? 'Cancel' : 'Edit'}</button>
    </div>
  );

  const HOC = withToggle(ViewEditToggleExample);

  const handleResetClick = (): void => {
    reset();
  };

  return (
    <div className="position-relative">
      <h1>Detail Page</h1>
      {data}
      <button onClick={() => console.log(moment().format('x'))}>check</button>
      <Clock />
      <Button className="btn-docx btn-secondary py-2 px-4 ms-3 mb-3 rounded" onClick={createDocx}>
        Create DOCX
      </Button>
      <HOC></HOC>
      <br />
      <div className="redux-tool-kit d-flex flex-column">
        <Button className="btn btn-warning ms-3" onClick={handleResetClick}>
          Reset Both Playlist
        </Button>
        <MoviePlayList />
      </div>
    </div>
  );
};
