import Panel from '../common/dropdown/Panel';
import { Button } from 'react-bootstrap';
import { useReducer } from 'react';

const INCREMENT_COUNT = 'increment';
const DECREMENT_COUNT = 'decrement';
const SET_VALUE_TO_ADD = 'set_value_to_add';
const ADD_VALUE_TO_COUNT = 'add_value_to_count';

const reducer = (state: { count: number; valueToAdd: number }, action: { type: string; payload: number }): any => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT_COUNT:
      return {
        ...state,
        count: state.count - 1,
      };
    case SET_VALUE_TO_ADD:
      return {
        ...state,
        valueToAdd: action.payload,
      };
    case ADD_VALUE_TO_COUNT:
      return {
        ...state,
        count: action.payload,
        valueToAdd: 0,
      };
    default:
      return state;
  }
};

const Counter = ({ initialCount }: any): any => {
  const [state, dispatch] = useReducer(reducer, {
    count: initialCount,
    valueToAdd: 0,
  });

  const increment = (): void => {
    dispatch({ type: INCREMENT_COUNT, payload: 0 });
  };

  const decrement = (): void => {
    dispatch({ type: DECREMENT_COUNT, payload: 0 });
  };

  const handleChange = (event: { target: { value: string } }): void => {
    const value = parseInt(event.target.value) || 0;
    dispatch({ type: SET_VALUE_TO_ADD, payload: value });
  };

  const handleSubmit = (event: { preventDefault: () => void }): void => {
    event.preventDefault();
    dispatch({ type: ADD_VALUE_TO_COUNT, payload: state.count + state.valueToAdd });
  };

  return (
    <Panel>
      <h1 className="text-black">Count is {state.count}</h1>
      <div className="d-flex">
        <Button className="me-3" onClick={increment}>
          Increment
        </Button>
        <Button onClick={decrement}>Decrement</Button>
      </div>

      <form onSubmit={handleSubmit}>
        <label>Add a lot!</label>
        <input
          value={state.valueToAdd || ''}
          type="number"
          className="p-1 m-3 bg-opacity-50 border-3"
          onChange={handleChange}
        />
        <Button type="submit">Add it!</Button>
      </form>
    </Panel>
  );
};

export default Counter;
