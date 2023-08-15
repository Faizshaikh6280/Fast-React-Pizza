import { Link } from "react-router-dom";

function CartOverview() {
  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 text-stone-300">
      <p className="space-x-2">
        <span>23 pizzas </span>
        <span>$23.45</span>
      </p>
      <Link className="uppercase tracking-widest text-stone-200" to="/cart">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
