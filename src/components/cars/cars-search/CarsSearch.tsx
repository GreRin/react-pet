import { useSelector } from 'react-redux';
import { useActions } from '../../../store/actions';

function CarSearch(): JSX.Element {
  const { changeSearchTerm } = useActions();
  const searchTerm = useSelector((state: any) => {
    return state.cars.searchTerm;
  });

  const handleSearchTermChange = (event: { target: { value: any } }): void => {
    changeSearchTerm(event.target.value);
  };

  return (
    <div className="list-header">
      <h3 className="title is-3">My Cars</h3>
      <div className="search field is-horizontal">
        <label className="label">Search</label>
        <input className="input" value={searchTerm} onChange={handleSearchTermChange} />
      </div>
    </div>
  );
}

export default CarSearch;
