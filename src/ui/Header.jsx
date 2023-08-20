import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from './username';
import { useSelector } from 'react-redux';
function Header() {
  const userName = useSelector((store) => store.user.userName);
  return (
    <header className="flex items-center justify-between border  bg-yellow-400 px-4 py-3 uppercase sm:p-4 md:p-6">
      <Link
        className=" text-sm font-semibold tracking-wider sm:text-base sm:tracking-widest"
        to="/"
      >
        Fast React Pizza co.
      </Link>
      <SearchOrder />
      {userName === '' ? null : <Username />}
    </header>
  );
}

export default Header;
