import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "./username";
function Header() {
  return (
    <header className="flex items-center justify-between border border-stone-800 bg-yellow-400 px-4 py-3 uppercase sm:p-6 md:p-8">
      <Link
        className=" text-sm font-semibold tracking-wider sm:text-base sm:tracking-widest"
        to="/"
      >
        Fast React Pizza co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
