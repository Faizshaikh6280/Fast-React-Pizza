import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './ui/Home';
import Error from './ui/Error';

import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';
import { action as createPriority } from './features/order/UpdatePriority';
import Order, { loader as orderLoader } from './features/order/Order';
import AppLayout from './ui/AppLayout';

const router = createBrowserRouter([
  {
    // this route also known as layout route that is allowed without any path.
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: '/cart', element: <Cart /> },

      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: createPriority,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
