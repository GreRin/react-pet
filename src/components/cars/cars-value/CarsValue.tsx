import { useSelector } from 'react-redux';
import { ICar } from '../../../interfaces';

function CarValue(): JSX.Element {
  const totalCost = useSelector(({ cars: { data, searchTerm } }: any) =>
    data
      .filter((car: ICar) => car.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .reduce((acc: number, car: ICar) => acc + car.cost, 0)
  );

  return <div className="car-value">Total Cost: ${totalCost}</div>;
}

export default CarValue;
