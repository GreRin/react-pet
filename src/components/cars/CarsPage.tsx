import './CarsPage.scss';
import CarForm from './car-form/CarForm';
import CarList from './cars-list/CarsList';
import CarSearch from './cars-search/CarsSearch';
import CarValue from './cars-value/CarsValue';

const CarsPage = (): JSX.Element => {
  return (
    <div className="container is-fluid">
      <CarForm />
      <CarSearch />
      <CarList />
      <CarValue />
    </div>
  );
};

export default CarsPage;
