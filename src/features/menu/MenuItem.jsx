import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { addItem, getItemQuanityById } from '../cart/cartSlice';
import DeleteItem from '../cart/DeleteButton';
import UpdateItem from '../cart/UpdateItem';
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  function handleAddItem() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice: unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  const itemQuantity = useSelector(getItemQuanityById(id));
  const isInCart = itemQuantity > 0;
  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'grayscale' : ''}`}
      />
      <div className="flex grow flex-col">
        <p className={`font-medium  text-stone-800 ${soldOut ? 'italic' : ''}`}>
          {name}
        </p>
        <p className="capitalize">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium text-stone-800">Sold out</p>
          )}
          {isInCart && (
            <div className="flex items-center gap-4">
              <UpdateItem pizzaId={id} currentItemQuantity={itemQuantity} />
              <DeleteItem pizzaId={id} />
            </div>
          )}
          {!soldOut && !isInCart && (
            <Button onClick={handleAddItem} type="small" disabled={soldOut}>
              Add to cart
            </Button>
          )}

          {/* {!soldOut ? null : (
            <Button onClick={handleAddItem} type="small" disabled={soldOut}>
              Add to cart
            </Button>
          )} */}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
