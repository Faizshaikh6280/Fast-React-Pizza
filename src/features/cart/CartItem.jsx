import { formatCurrency } from '../../utils/helpers';
import DeleteItem from './DeleteButton';
import UpdateItem from './UpdateItem';
import { getItemQuanityById } from './cartSlice';
import { useSelector } from 'react-redux';
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const itemQuantity = useSelector(getItemQuanityById(pizzaId));
  return (
    <li className="flex justify-between p-4">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center space-x-4">
        <p>{formatCurrency(totalPrice)}</p>
        <UpdateItem pizzaId={pizzaId} currentItemQuantity={itemQuantity} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
