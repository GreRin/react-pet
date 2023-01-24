import { faker } from '@faker-js/faker/locale/en';
import './MoviePlayList.scss';
import { Button } from 'react-bootstrap';
import { useActions } from '../../store/actions';
import { useSelector } from 'react-redux';

function SongsPlaylist(): JSX.Element {
  const createRandomMovie = (): any => {
    return `${faker.word.adjective()} ${faker.word.noun()}`;
  };
  const { addSong, removeSong } = useActions();

  const songsPlaylist: string[] = useSelector((state: any): any => {
    return state.songs;
  });

  const handleSongAdd = (song: any): void => {
    addSong(song);
  };
  const handleSongsRemove = (song: any): void => {
    removeSong(song);
  };

  const renderedSongs = songsPlaylist.map((songs) => {
    return (
      <li key={songs}>
        {songs}
        <Button onClick={() => handleSongsRemove(songs)} className="btn btn-danger">
          X
        </Button>
      </li>
    );
  });

  return (
    <div className="content">
      <div className="table-header">
        <h3 className="subtitle is-3">Movie Playlist</h3>
        <div className="buttons">
          <Button onClick={() => handleSongAdd(createRandomMovie())} className="btn btn-primary">
            + Add Movie to Playlist
          </Button>
        </div>
      </div>
      <ul>{renderedSongs}</ul>
    </div>
  );
}

export default SongsPlaylist;
