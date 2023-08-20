import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearItem, getCart } from './cartSlice';
import EmptyCart from './EmptyCart';
// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  const userName = useSelector((store) => store.user.name);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  function handleClearCart() {
    dispatch(clearItem());
  }

  if (cart.length === 0) return <EmptyCart />;
  return (
    <div className="px-8 py-2">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-4 text-xl">
        Your cart, <span className="font-medium">{userName}</span>
      </h2>

      <ul className="mt-4 flex flex-col divide-y divide-stone-200 border-b ">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId}></CartItem>
        ))}
      </ul>

      <div className="mt-4">
        <Button type="small" to="/order/new">
          Order pizzas
        </Button>
        <Button onClick={handleClearCart} type="secondary">
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
