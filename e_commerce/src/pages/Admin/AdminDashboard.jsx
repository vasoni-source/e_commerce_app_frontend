import React, { useState,useEffect } from "react";
import {
  Trash2,
  Package,
  ShoppingCart,
  Users,
  Store,
  DollarSign,
  TrendingUp,
  Eye,
} from "lucide-react";
import { useSelector,useDispatch } from "react-redux";
import { getAllOrders, getAllOrdersByUser, getAllProductsWithoutPagination, getAllSellersStats, getAllUsers } from "../../redux/thunk/adminThunk";
import { deleteProduct } from "../../redux/thunk/sellerThunk";
import { logOut } from "../../redux/slices/authSlice";
import { LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const products = useSelector((state)=>state.admin.products);
  const productsCount = products.length;
  const orders = useSelector((state)=>state.admin.orders);
  const pendingOrder = orders.filter((order)=>order.status==="Pending")
  const pendingOrderCount = pendingOrder.length
  const totalRevenue = useSelector((state)=>state.admin.totalRevenue);
  const users = useSelector((state)=>state.admin.users);
  const userOrder = useSelector((state)=>state.admin.userOrder);
  const sellerStats = useSelector((state)=>state.admin.sellersStats)
  console.log("sellers stats",sellerStats);
  // const userOrderCount = userOrder.length;
  console.log("orders fromm admin page",orders)
  useEffect(()=>{
    dispatch(getAllProductsWithoutPagination());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
    dispatch(getAllOrdersByUser())
    dispatch(getAllSellersStats())
  },[dispatch])
   const sortedOrders = (orders || [])
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    console.log("sorted orders",sortedOrders)

    const getStatusColor = (status) => {
      switch (status) {
        case "delivered":
          return "bg-green-100 text-green-800";
        case "Shipped":
          return "bg-blue-100 text-blue-800";
        case "processing":
          return "bg-yellow-100 text-yellow-800";
        case "cancelled":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };
  // Sample data
//   const [products, setProducts] = useState([
//     {
//       id: 1,
//       name: "Wireless Headphones",
//       price: 99.99,
//       stock: 45,
//       category: "Electronics",
//       seller: "TechStore",
//     },
//     {
//       id: 2,
//       name: "Running Shoes",
//       price: 79.99,
//       stock: 120,
//       category: "Sports",
//       seller: "SportsMart",
//     },
//     {
//       id: 3,
//       name: "Coffee Maker",
//       price: 149.99,
//       stock: 32,
//       category: "Home",
//       seller: "HomeGoods",
//     },
//     {
//       id: 4,
//       name: "Laptop Bag",
//       price: 49.99,
//       stock: 87,
//       category: "Accessories",
//       seller: "TechStore",
//     },
//     {
//       id: 5,
//       name: "Smart Watch",
//       price: 299.99,
//       stock: 23,
//       category: "Electronics",
//       seller: "GadgetHub",
//     },
//   ]);

//   const orders = [
//     {
//       id: "ORD-001",
//       customer: "John Doe",
//       total: 299.98,
//       status: "Delivered",
//       date: "2024-11-18",
//     },
//     {
//       id: "ORD-002",
//       customer: "Jane Smith",
//       total: 149.99,
//       status: "Shipped",
//       date: "2024-11-19",
//     },
//     {
//       id: "ORD-003",
//       customer: "Bob Johnson",
//       total: 79.99,
//       status: "Processing",
//       date: "2024-11-20",
//     },
//     {
//       id: "ORD-004",
//       customer: "Alice Brown",
//       total: 429.97,
//       status: "Delivered",
//       date: "2024-11-17",
//     },
//     {
//       id: "ORD-005",
//       customer: "Charlie Wilson",
//       total: 199.98,
//       status: "Shipped",
//       date: "2024-11-19",
//     },
//   ];

//   const users = [
//     {
//       id: 1,
//       name: "John Doe",
//       email: "john@example.com",
//       orders: 12,
//       joined: "2024-01-15",
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       email: "jane@example.com",
//       orders: 8,
//       joined: "2024-02-20",
//     },
//     {
//       id: 3,
//       name: "Bob Johnson",
//       email: "bob@example.com",
//       orders: 5,
//       joined: "2024-03-10",
//     },
//     {
//       id: 4,
//       name: "Alice Brown",
//       email: "alice@example.com",
//       orders: 15,
//       joined: "2023-12-05",
//     },
//     {
//       id: 5,
//       name: "Charlie Wilson",
//       email: "charlie@example.com",
//       orders: 3,
//       joined: "2024-04-22",
//     },
//   ];
const handleLogOut = () => {
  dispatch(logOut());
  Cookies.remove("user");
  Cookies.remove("token");
  navigator("/");
};
  const sellers = [
    {
      id: 1,
      name: "TechStore",
      products: 145,
      revenue: 45289.5,
      rating: 4.8,
      joined: "2023-06-10",
    },
    {
      id: 2,
      name: "SportsMart",
      products: 89,
      revenue: 32150.75,
      rating: 4.6,
      joined: "2023-08-15",
    },
    {
      id: 3,
      name: "HomeGoods",
      products: 210,
      revenue: 67890.25,
      rating: 4.9,
      joined: "2023-05-20",
    },
    {
      id: 4,
      name: "GadgetHub",
      products: 76,
      revenue: 28340.0,
      rating: 4.7,
      joined: "2023-09-01",
    },
  ];

//   const revenueData = {
//     total: 173670.5,
//     thisMonth: 45289.5,
//     lastMonth: 38950.25,
//     growth: 16.3,
//   };

  const handleDeleteProduct = (id) => {
    // setProducts(products.filter((p) => p.id !== id));
    dispatch(deleteProduct(id));
  };

  // const getStatusColor = (status) => {
  //   switch (status) {
  //     case "Delivered":
  //       return "bg-green-100 text-green-800";
  //     case "Shipped":
  //       return "bg-blue-100 text-blue-800";
  //     case "Processing":
  //       return "bg-yellow-100 text-yellow-800";
  //     default:
  //       return "bg-gray-100 text-gray-800";
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
    <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
    <button
      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
      onClick={handleLogOut}
    >
      <LogOut className="w-5 h-5" />
      <span>Logout</span>
    </button>
  </div>
</header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-3xl font-bold text-gray-900">
                  {productsCount}
                </p>
              </div>
              <Package className="w-12 h-12 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">
                  {orders.length}
                </p>
              </div>
              <ShoppingCart className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">
                  {users.length}
                </p>
              </div>
              <Users className="w-12 h-12 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${totalRevenue?.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-12 h-12 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {["overview", "products", "orders", "users", "sellers"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                      activeTab === tab
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Revenue Overview
                      </h3>
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div> */}
                    {/* <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">This Month</p>
                        <p className="text-2xl font-bold text-gray-900">
                          ${revenueData.thisMonth.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Last Month</p>
                        <p className="text-xl font-semibold text-gray-700">
                          ${revenueData.lastMonth.toLocaleString()}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-blue-200">
                        <p className="text-sm text-green-600 font-medium">
                          +{revenueData.growth}% growth
                        </p>
                      </div>
                    </div> */}
                  {/* </div> */}

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Quick Stats
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Active Sellers</span>
                        <span className="font-semibold text-gray-900">
                          {sellers.length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Products Listed</span>
                        <span className="font-semibold text-gray-900">
                          {productsCount}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Registered Users</span>
                        <span className="font-semibold text-gray-900">
                          {users.length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Pending Orders</span>
                        <span className="font-semibold text-gray-900">
                          {
                            pendingOrderCount
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Recent Orders
                  </h3>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Order ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Customer
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Total
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {sortedOrders.slice(0, 3).map((order) => (
                          <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {order._id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {order.user.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${order.totalAmount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                                  order.status
                                )}`}
                              >
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Products Tab */}
            {activeTab === "products" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    All Products
                  </h2>
                  {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Add Product
                  </button> */}
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Seller
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {product.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            ${product.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {product.stock}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {product.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {product.seller.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex space-x-2">
                              {/* <button className="text-blue-600 hover:text-blue-800">
                                <Eye className="w-5 h-5" />
                              </button> */}
                              <button
                                onClick={() => handleDeleteProduct(product._id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  All Orders
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Date
                        </th>
                        {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Actions
                        </th> */}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order._id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {order.user.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${order.totalAmount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {order.createdAt}
                          </td>
                          {/* <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-blue-600 hover:text-blue-800">
                              <Eye className="w-5 h-5" />
                            </button>
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === "users" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  All Users
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Orders
                        </th>
                        {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Joined
                        </th> */}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Total Purchase
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {userOrder.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {user.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {user.orderCount}
                          </td>
                         
                          {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {user.createdAt}
                          </td> */}
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {user.totalOrderAmount}
                          </td>
                          {/* <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-blue-600 hover:text-blue-800">
                              <Eye className="w-5 h-5" />
                            </button>
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Sellers Tab */}
            {activeTab === "sellers" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  All Sellers
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sellerStats.map((seller) => (
                    <div
                      key={seller._id}
                      className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {seller.name}
                          </h3>
                          {/* <p className="text-sm text-gray-500">
                            Joined {seller.joined}
                          </p> */}
                        </div>
                        <Store className="w-8 h-8 text-blue-500" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Products</span>
                          <span className="font-semibold text-gray-900">
                            {seller.products}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Revenue</span>
                          <span className="font-semibold text-gray-900">
                            ${seller.revenue.toLocaleString()}
                          </span>
                        </div>
                        {/* <div className="flex justify-between">
                          <span className="text-gray-600">Rating</span>
                          <span className="font-semibold text-gray-900">
                            {seller.rating} ⭐
                          </span>
                        </div> */}
                      </div>
                     
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
