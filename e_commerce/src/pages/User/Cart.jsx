import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
// import { XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  getCart,
  removeCartItem,
} from "../../redux/thunk/cartThunk";

export default function Cart() {
  // const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  // const products = useSelector((state) => state?.cart?.cart?.items);
  const cart = useSelector((state)=>state.cart?.cart);
  const subTotal = useSelector((state) => state.cart.cart.totalPrice);
  console.log("cart from cart", cart);
  useEffect(() => {
    console.log("insideUseeffect");
    dispatch(getCart());
    console.log("after fn call");
  }, [dispatch]);
  const handleremoveCart = (id) => {
    console.log("prosuct id from cart page",id)
    dispatch(removeCartItem(id));
    console.log("cart after remove",cart)
  };
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between mb-8">
          <h1 className="text-2xl font-medium text-gray-900">Shopping cart</h1>
        </div>

        <div className="mt-8">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {cart.items?.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      alt={product.imageAlt}
                      src={product.productId.imageUrl}
                      className="size-full object-cover"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={product.href}>{product.name}</a>
                        </h3>
                        <p className="ml-4">{product.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.color}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500">Qty {product.quantity}</p>

                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => {
                            handleremoveCart(product.productId._id);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>{subTotal}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <a
              href="#"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
            >
              Checkout
            </a>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <button
                type="button"
                onClick={() => navigator("/")}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
