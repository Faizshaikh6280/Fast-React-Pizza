import { useDispatch } from 'react-redux';
import { deleteItem } from './cartSlice';
import Button from '../../ui/Button';
function DeleteButton({ pizzaId }) {
  const dispatch = useDispatch();
  function handleDeleteItem() {
    dispatch(deleteItem(pizzaId));
  }
  return (
    <Button onClick={handleDeleteItem} type={'small'}>
      Delete
    </Button>
  );
}

export default DeleteButton;
