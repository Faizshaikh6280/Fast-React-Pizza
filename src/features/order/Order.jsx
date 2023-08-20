// Test ID: IIDSAT

import { useFetcher, useLoaderData } from 'react-router-dom';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import { getOrder } from '../../services/apiRestaurant';
import OrderItem from './OrderItem';
import store from '../../store';
import { clearItem } from '../cart/cartSlice';
import { useEffect } from 'react';
import UpdateItem from '../cart/UpdateItem';
import UpdatePriority from './UpdatePriority';
const order = {
  id: 'ABCDEF',
  customer: 'Jonas',
  phone: '123456789',
  address: 'Arroios, Lisbon , Portugal',
  priority: true,
  estimatedDelivery: '2027-04-25T10:00:00',
  cart: [
    {
      pizzaId: 7,
      name: 'Napoli',
      quantity: 3,
      unitPrice: 16,
      totalPrice: 48,
    },
    {
      pizzaId: 5,
      name: 'Diavola',
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
    {
      pizzaId: 3,
      name: 'Romana',
      quantity: 1,
      unitPrice: 15,
      totalPrice: 15,
    },
  ],
  position: '-9.000,38.000',
  orderPrice: 95,
  priorityPrice: 19,
};

function Order() {
  const fetcher = useFetcher();
  const order = useLoaderData();
  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === 'idle') {
        fetcher.load('/menu');
      }
    },
    [fetcher],
  );

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Order #{id} Status</h2>

        <div className="flex gap-2">
          {priority && (
            <span className="inline-block rounded-full bg-red-500 px-4 py-2 font-medium text-white">
              Priority{' '}
            </span>
          )}
          <span className="inline-block rounded-full bg-green-500 px-4  py-2 font-medium capitalize text-white">
            {status} order
          </span>
        </div>
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 bg-gray-200/70 px-6 py-4">
        <p className="text-lg font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>
      <ul className="my-10 divide-y-2 divide-stone-200 border-b-2 border-t-2">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            ingredients={
              fetcher.data?.find((el) => el.id === item.pizzaId)?.ingredients ??
              []
            }
            isLoadingIngredients={fetcher.state === 'loading'}
          />
        ))}
      </ul>
      <div className="mt-8 space-y-4 bg-gray-200/70 px-6 py-4">
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-semibold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
        {!priority && (
          <span className="text-right">
            <UpdatePriority />
          </span>
        )}
      </div>
    </div>
  );
}
export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  // should bot Oversue . it slow down th performance of redux.
  store.dispatch(clearItem());
  return order;
}
export default Order;
