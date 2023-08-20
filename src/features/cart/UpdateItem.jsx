import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { decrementItemQuantity, incrementItemQuantity } from './cartSlice';

function UpdateItem({ pizzaId, currentItemQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-4">
      <Button
        type="round"
        onClick={() => {
          dispatch(decrementItemQuantity(pizzaId));
        }}
      >
        -
      </Button>
      <span>{currentItemQuantity}</span>
      <Button
        type="round"
        onClick={() => {
          dispatch(incrementItemQuantity(pizzaId));
        }}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItem;
