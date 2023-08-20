import { Outlet, useNavigation } from 'react-router-dom';
import Header from './Header';
import CartOverview from '../features/cart/CartOverview';
import Loader from './LoaderSpinner';
import { getTotalPrice } from '../features/cart/cartSlice';
import { useSelector } from 'react-redux';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const totalItemPrice = useSelector(getTotalPrice);

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}

      <Header />
      <div className="overflow-scroll ">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      <footer>{totalItemPrice === 0 ? null : <CartOverview />}</footer>
    </div>
  );
}

export default AppLayout;
