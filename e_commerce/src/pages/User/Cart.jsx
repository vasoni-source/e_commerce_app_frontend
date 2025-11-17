import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
// import { XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  getCart,
  removeCartItem,
} from "../../redux/thunk/cartThunk";
import { createOrder } from "../../redux/thunk/orderThunk";

export default function Cart() {
  // const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  // const products = useSelector((state) => state?.cart?.cart?.items);
  const cart = useSelector((state) => state.cart?.cart);
  const user = useSelector((state) => state.user.user);
  const totalPrice = useSelector((state) => state.cart.cart.totalPrice);
  const orderItems = cart.items;
  console.log("cart from cart", cart);
  useEffect(() => {
    dispatch(getCart());
    console.log("after fn call");
  }, [dispatch]);
  const handleremoveCart = (id) => {
    console.log("prosuct id from cart page", id);
    dispatch(removeCartItem(id));
    console.log("cart after remove", cart);
  };
  const [openAdvanceFields, setOpenAdvanceFields] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState("COD");
 const [useNewAddress, setUseNewAddress] = useState(false);

  // Handler for shipping address changes
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for payment method change
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const handleOrder = () => {
    console.log("address from page", shippingAddress);
    dispatch(
      createOrder({ orderItems, totalPrice, shippingAddress, paymentMethod })
    );
  };
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="p-10 text-center text-xl">
        No items to show in your cart
      </div>
    );
  }
  return (
    <>
      {/* {cart.items ? ( */}
        <div className="min-h-screen bg-white">
          <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-start justify-between mb-8">
              <h1 className="text-2xl font-medium text-gray-900">
                Shopping cart
              </h1>
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
                          <p className="text-gray-500">
                            Qty {product.quantity}
                          </p>

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
                <p>{totalPrice}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              {openAdvanceFields ? null : (
                <div className="mt-6">
                  <button
                    href="#"
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                    onClick={() => setOpenAdvanceFields(true)}
                  >
                    Checkout
                  </button>
                </div>
              )}
              {openAdvanceFields ? (
                <>
                  {/* <div className="border-t border-gray-200 mt-8 pt-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      Shipping Address
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Street Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={shippingAddress.address}
                          onChange={(e) => handleShippingChange(e)}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          placeholder="123 Main St"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium text-gray-700"
                          >
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={shippingAddress.city}
                            onChange={(e) => handleShippingChange(e)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            placeholder="New York"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="postalCode"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Postal Code
                          </label>
                          <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            value={shippingAddress.postalCode}
                            onChange={(e) => handleShippingChange(e)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            placeholder="10001"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={shippingAddress.country}
                          onChange={(e) => handleShippingChange(e)}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          placeholder="United States"
                        />
                      </div>
                    </div>
                    
                  </div> */}
                  {/* SHIPPING ADDRESS SELECTION */}
                  <div className="border-t border-gray-200 mt-8 pt-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      Choose Shipping Address
                    </h2>

                    {/* 1️⃣ Existing Saved Addresses */}
                    {user?.shippingAddresses?.length > 0 && (
                      <div className="space-y-3 mb-6">
                        {user.shippingAddresses.map((addr, index) => (
                          <label
                            key={index}
                            className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                          >
                            <input
                              type="radio"
                              name="shippingSelect"
                              value={index}
                              onChange={() => {
                                setShippingAddress(addr); // Auto-fill selected address
                                setUseNewAddress(false);
                              }}
                              className="mt-1"
                            />
                            <span className="text-sm text-gray-800">
                              <strong>{addr.address}</strong>, {addr.city},{" "}
                              {addr.postalCode}, {addr.country}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}

                    {/* 2️⃣ Add New Address Option */}
                    <label className="flex items-center gap-2 mt-4 mb-3">
                      <input
                        type="radio"
                        name="shippingSelect"
                        onChange={() => setUseNewAddress(true)}
                        className="h-4 w-4"
                      />
                      <span className="text-sm text-gray-700">
                        Use a new address
                      </span>
                    </label>

                    {/* 3️⃣ NEW ADDRESS INPUT FIELDS */}
                    {useNewAddress && (
                      <div className="space-y-4 mt-4">
                        <input
                          type="text"
                          name="address"
                          value={shippingAddress.address}
                          onChange={handleShippingChange}
                          placeholder="Street Address"
                          className="w-full p-2 border rounded"
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            name="city"
                            value={shippingAddress.city}
                            onChange={handleShippingChange}
                            placeholder="City"
                            className="w-full p-2 border rounded"
                          />

                          <input
                            type="text"
                            name="postalCode"
                            value={shippingAddress.postalCode}
                            onChange={handleShippingChange}
                            placeholder="Postal Code"
                            className="w-full p-2 border rounded"
                          />
                        </div>

                        <input
                          type="text"
                          name="country"
                          value={shippingAddress.country}
                          onChange={handleShippingChange}
                          placeholder="Country"
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-200 mt-8 pt-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      Payment Method
                    </h2>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="COD"
                          onChange={(e) => handlePaymentChange(e)}
                          defaultChecked
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          Cash on Delivery (COD)
                        </span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="Credit Card"
                          onChange={(e) => handlePaymentChange(e)}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          Credit Card
                        </span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="Debit Card"
                          onChange={(e) => handlePaymentChange(e)}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          Debit Card
                        </span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="PayPal"
                          onChange={(e) => handlePaymentChange(e)}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          PayPal
                        </span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="Stripe"
                          onChange={(e) => handlePaymentChange(e)}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          Stripe
                        </span>
                      </label>
                    </div>
                  </div>
                </>
              ) : null}
              {openAdvanceFields ? (
                <button
                  href="#"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
                  onClick={handleOrder}
                >
                  Place Order
                </button>
              ) : null}
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
      {/* // ) : (
      //   <div>No items to show in your cart </div>
      // )} */}
    </>
  );
}
