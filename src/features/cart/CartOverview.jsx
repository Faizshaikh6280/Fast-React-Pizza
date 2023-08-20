import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalPrice, getTotalQuantity } from './cartSlice';

function CartOverview() {
  const totalItemQuantity = useSelector(getTotalQuantity);
  const totalItemPrice = useSelector(getTotalPrice);
  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 text-stone-300">
      <p className="space-x-2">
        <span>{totalItemQuantity} pizzas </span>
        <span>${totalItemPrice}</span>
      </p>
      <Link className="uppercase tracking-widest text-stone-200" to="/cart">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
