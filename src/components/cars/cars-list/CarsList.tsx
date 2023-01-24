import { useSelector } from 'react-redux';
import { useActions } from '../../../store/actions';
import { ICar } from '../../../interfaces';

function CarList(): JSX.Element {
  const { removeCar } = useActions();
  const { cars, name } = useSelector(({ form, cars: { data, searchTerm } }: any) => {
    const filteredCars = data.filter((car: ICar) => car.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return {
      cars: filteredCars,
      name: form.name,
    };
  });

  const handleCarDelete = (car: ICar): void => {
    removeCar(car.id);
  };

  const renderedCars = cars.map((car: ICar): JSX.Element => {
    // DECIDE IF THIS CAR SHOULD BE BOLD
    const bold = name && car.name.toLowerCase().includes(name.toLowerCase());

    return (
      <div key={car.id} className={`panel ${bold && 'bold'}`}>
        <p>
          {car.name} - ${car.cost}
        </p>
        <button className="button is-danger" onClick={() => handleCarDelete(car)}>
          Delete
        </button>
      </div>
    );
  });

  return (
    <div className="car-list">
      {renderedCars}
      <hr />
    </div>
  );
}

export default CarList;
