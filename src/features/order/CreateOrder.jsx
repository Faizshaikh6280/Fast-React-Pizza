import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { getCart, getTotalPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const navigation = useNavigation();
  const {
    userName,
    status,
    position,
    error: addressError,
    address,
  } = useSelector((store) => store.user);
  const isloadingAddress = status === 'pending';
  const isSubmitting = navigation.state === 'submitting';
  const dispatch = useDispatch();
  // for handling error.
  const formError = useActionData();
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);

  const itemsPrice = useSelector(getTotalPrice);
  const pirorityPrice = withPriority ? itemsPrice * 0.2 : 0;
  const finalPrice = itemsPrice + pirorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="my-10 px-4">
      <h2 className="mb-4 text-xl font-medium">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-6 items-center md:flex">
          <label className=" mb-2 basis-36" htmlFor="name">
            First Name
          </label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="customer"
              defaultValue={userName}
              required
              id="name"
            />
          </div>
        </div>

        <div className="mb-6 items-center md:flex">
          <label className="mb-2 basis-36" htmlFor="phone">
            Phone number
          </label>
          <div className="grow">
            <input
              className="input w-full"
              type="tel"
              name="phone"
              id="phone"
              required
            />
            {formError?.phone && (
              <p className="mt-2 rounded-md bg-rose-100 p-2 text-sm text-rose-600">
                {formError.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-6 items-center md:flex">
          <label className="mb-2 basis-36 " htmlFor="address">
            Address
          </label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
              id="address"
              defaultValue={address}
              disabled={isloadingAddress}
            />
            {addressError && (
              <p className="mt-2 rounded-md bg-rose-100 p-2 text-sm text-rose-600">
                {addressError}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-1 top-[27px] md:top-0">
              <Button
                className
                type="small"
                onClick={() => {
                  dispatch(fetchAddress());
                }}
                disabled={isloadingAddress}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="mt-4 inline-block h-4 w-4 accent-yellow-400"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="ml-2">
            Want to yo give your order priority?
          </label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)}></input>
        <input
          type="hidden"
          name="position"
          value={
            position.latitude && position.longitude
              ? `Position corrditantes (${position.latitude},${position.longitude})`
              : ''
          }
        ></input>
        <div>
          <Button disabled={isSubmitting || isloadingAddress} type="primary">
            {isSubmitting
              ? 'Placing order...'
              : `Order now from $${finalPrice}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    priority: data.priority === 'true',
    cart: JSON.parse(data.cart),
  };
  console.log(data);
  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone =
      'Please provide valid phone number as we might need it to contact you.';
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
