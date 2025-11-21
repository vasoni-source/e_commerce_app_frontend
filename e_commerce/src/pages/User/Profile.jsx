import React, { useEffect, useState } from "react";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  ShoppingBag,
  Star,
} from "lucide-react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { cancelOrder, getOrders } from "../../redux/thunk/orderThunk";
import updateUserField from "../../redux/thunk/userThunk";
import { logOut } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function Profile() {
  const [activeTab, setActiveTab] = useState("orders");
  const navigator = useNavigate();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [openAddressInput, setOpenAddressInput] = useState(false);
  const [open, setOpen] = useState(false);
  const orders = useSelector((state) => state.order?.order);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phoneNumber || "");
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phoneNumber);
    }
  }, [user]);
  console.log("phone",phone)

  console.log("orders from profile", orders);
  console.log("user from profile page ", user);
  const handleCancelOrder = (orderId) => {
    console.log("orderId from profile", orderId);
    dispatch(cancelOrder(orderId));
    setOpen(false);
  };

  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "In Transit":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const handleUpdateData = () => {
    dispatch(updateUserField(shippingAddress));
    setOpenAddressInput(false);
  };
  const handleSave = () => {
    dispatch(updateUserField({ name, phoneNumber: phone  }));
    Cookies.set('token', res.data.token, { expires: 0.5 });
          Cookies.set('user', JSON.stringify(res.data.user), { expires: 0.5 });
  };
  const handleLogOut = () => {
    dispatch(logOut());
    Cookies.remove("user");
    Cookies.remove("token");
    navigator("/");
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
            <button
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              onClick={handleLogOut}
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col items-center">
                {/* <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full border-4 border-indigo-100" /> */}
                <User className="w-5 h-5" />
                <h2 className="mt-4 text-xl font-semibold text-gray-900">
                  {user?.name}
                </h2>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>

              <nav className="mt-8 space-y-2">
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === "orders"
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Package className="w-5 h-5" />
                  <span className="font-medium">My Orders</span>
                </button>

                <button
                  onClick={() => setActiveTab("addresses")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === "addresses"
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">Addresses</span>
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === "settings"
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-medium">Settings</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h3 className="text-xl font-semibold text-gray-900">
                    My Orders
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  {orders?.map((order) => (
                    <div
                      key={order._id}
                      className="border rounded-lg p-4 hover:shadow-md transition"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold text-gray-900">
                              {order._id}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            Order Date: {order.createdAt}
                          </p>
                          {/* <p className="text-sm text-gray-600">{order.orderItems} items</p> */}
                          <h4>Items:</h4>
                          {order.orderItems.map((item) => (
                            <div key={item._id}>
                              <p>Product: {item.product}</p>
                              <p>Quantity: {item.quantity}</p>
                              <p>Price: {item.price}</p>
                            </div>
                          ))}
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            {order.totalAmount}
                          </p>
                          <button className="mt-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                            View Details →
                          </button>
                          {order.status === "Pending" ||
                          order.status === "Processing" ? (
                            <div>
                              <button
                                type="button"
                                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 
             font-medium rounded-md text-sm px-4 py-2.5 shadow"
                                // onClick={()=>handleCancelOrder(order._id)}
                                onClick={() => setOpen(true)}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div>
                        <Dialog
                          open={open}
                          onClose={setOpen}
                          className="relative z-10"
                        >
                          <DialogBackdrop
                            transition
                            className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                          />

                          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                              <DialogPanel
                                transition
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                              >
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                  <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                      <ExclamationTriangleIcon
                                        aria-hidden="true"
                                        className="size-6 text-red-600"
                                      />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                      <DialogTitle
                                        as="h3"
                                        className="text-base font-semibold text-gray-900"
                                      >
                                        Cancel Order
                                      </DialogTitle>
                                      <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                          Are you sure you want to cancel this
                                          order? This action cannot be undone.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                  <button
                                    type="button"
                                    // onClick={() => setOpen(false)}
                                    onClick={() => handleCancelOrder(order._id)}
                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => setOpen(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </DialogPanel>
                            </div>
                          </div>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Saved Addresses
                  </h3>
                  <button
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    onClick={() => setOpenAddressInput(true)}
                  >
                    + Add New Address
                  </button>
                </div>
                {openAddressInput ? (
                  <>
                    <div className="border-t border-gray-200 mt-8 pt-6">
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
                    </div>
                    <button
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                      onClick={handleUpdateData}
                    >
                      Add Address
                    </button>
                  </>
                ) : null}
                <div className="p-6 space-y-4">
                  {user?.shippingAddresses?.map((addr) => (
                    <div
                      key={addr.id}
                      className="border rounded-lg p-4 hover:shadow-md transition"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-indigo-600 mt-1" />
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              {/* <span className="font-semibold text-gray-900">{addr.type}</span> */}
                              {addr.default && (
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-gray-700">{addr.address}</p>
                            <p className="text-gray-600">{addr.city}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Account Settings
                  </h3>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user?.email}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div> */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="pt-4">
                    <button
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                      onClick={handleSave}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
