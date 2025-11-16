import React,{useEffect, useState} from 'react'
import { User, Package, Heart, MapPin, CreditCard, Settings, LogOut, ShoppingBag, Star } from 'lucide-react';
import { useSelector,useDispatch } from 'react-redux';
import { getOrders } from '../../redux/thunk/orderThunk';
import  updateUserField  from '../../redux/thunk/userThunk';
export default function Profile() {
  const [activeTab, setActiveTab] = useState('orders');
  const user = useSelector((state)=>state.user.user);;
  const dispatch = useDispatch();
  const [openAddressInput,setOpenAddressInput] = useState(false);
  const orders = useSelector((state)=>state.order?.order)
  useEffect(()=>{
    dispatch(getOrders())
      },[])
  console.log("orders from profile",orders);
  console.log("user from profile page ",user);
  // const user = {
  //   name: 'Sarah Johnson',
  //   email: 'sarah.johnson@example.com',
  //   phone: '+1 (555) 123-4567',
  //   avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  //   memberSince: 'January 2023',
  //   loyaltyPoints: 1250
  // };

  // const orders = [
  //   { id: '#ORD-2024-001', date: '2024-11-10', status: 'Delivered', total: '$156.99', items: 3 },
  //   { id: '#ORD-2024-002', date: '2024-11-05', status: 'In Transit', total: '$89.50', items: 2 },
  //   { id: '#ORD-2024-003', date: '2024-10-28', status: 'Delivered', total: '$234.00', items: 5 }
  // ];

  const wishlist = [
    { id: 1, name: 'Wireless Headphones', price: '$129.99', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop' },
    { id: 2, name: 'Smart Watch', price: '$299.99', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop' },
    { id: 3, name: 'Running Shoes', price: '$89.99', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop' }
  ];

  // const addresses = [
  //   { id: 1, type: 'Home', address: '123 Main St, Apt 4B', city: 'New York, NY 10001', default: true },
  //   { id: 2, type: 'Work', address: '456 Business Ave, Suite 200', city: 'New York, NY 10002', default: false }
  // ];
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  const handleUpdateData = ()=>{
    dispatch(updateUserField(shippingAddress))
    setOpenAddressInput(false);
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
            <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition">
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
                <h2 className="mt-4 text-xl font-semibold text-gray-900">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
                {/* <div className="mt-4 px-4 py-2 bg-indigo-50 rounded-full">
                  <p className="text-sm font-medium text-indigo-700">{user.loyaltyPoints} Points</p>
                </div> */}
              </div>

              <nav className="mt-8 space-y-2">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === 'orders' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Package className="w-5 h-5" />
                  <span className="font-medium">My Orders</span>
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === 'wishlist' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Heart className="w-5 h-5" />
                  <span className="font-medium">Wishlist</span>
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === 'addresses' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">Addresses</span>
                </button>
                <button
                  onClick={() => setActiveTab('payment')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === 'payment' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="font-medium">Payment Methods</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === 'settings' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'
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
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h3 className="text-xl font-semibold text-gray-900">My Orders</h3>
                </div>
                <div className="p-6 space-y-4">
                  {orders?.map((order) => (
                    <div key={order._id} className="border rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold text-gray-900">{order._id}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">Order Date: {order.createdAt}</p>
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
                          <p className="text-lg font-bold text-gray-900">{order.totalAmount}</p>
                          <button className="mt-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                            View Details →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h3 className="text-xl font-semibold text-gray-900">My Wishlist</h3>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.map((item) => (
                    <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                      <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{item.name}</h4>
                        <p className="text-lg font-bold text-indigo-600 mb-3">{item.price}</p>
                        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                          <ShoppingBag className="w-4 h-4" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Saved Addresses</h3>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  onClick={()=>setOpenAddressInput(true)}>
                    + Add New Address
                  </button>
                </div>
                {openAddressInput?
                <>
                  <div className="border-t border-gray-200 mt-8 pt-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Street Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={shippingAddress.address}
                        onChange={(e)=>handleShippingChange(e)}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="123 Main St"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={shippingAddress.city}
                          onChange={(e)=>handleShippingChange(e)}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          placeholder="New York"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={shippingAddress.postalCode}
                          onChange={(e)=>handleShippingChange(e)}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          placeholder="10001"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={shippingAddress.country}
                        onChange={(e)=>handleShippingChange(e)}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        placeholder="United States"
                      />
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                onClick={handleUpdateData}>
                  Add Address
                </button>
                </>
                :null
                }
                <div className="p-6 space-y-4">
                  {user.shippingAddresses.map((addr) => (
                    <div key={addr.id} className="border rounded-lg p-4 hover:shadow-md transition">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-indigo-600 mt-1" />
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              {/* <span className="font-semibold text-gray-900">{addr.type}</span> */}
                              {addr.default && (
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Default</span>
                              )}
                            </div>
                            <p className="text-gray-700">{addr.address}</p>
                            <p className="text-gray-600">{addr.city}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">Edit</button>
                          <button className="text-red-600 hover:text-red-700 text-sm font-medium">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Methods Tab */}
            {activeTab === 'payment' && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Payment Methods</h3>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                    + Add Card
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div className="border rounded-lg p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <CreditCard className="w-8 h-8" />
                      <span className="text-sm font-medium">Default</span>
                    </div>
                    <p className="text-lg font-mono tracking-wider mb-4">•••• •••• •••• 4242</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs opacity-80">Card Holder</p>
                        <p className="font-medium">SARAH JOHNSON</p>
                      </div>
                      <div>
                        <p className="text-xs opacity-80">Expires</p>
                        <p className="font-medium">12/26</p>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-6 h-6 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">•••• •••• •••• 8888</p>
                          <p className="text-sm text-gray-600">Expires 08/27</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">Edit</button>
                        <button className="text-red-600 hover:text-red-700 text-sm font-medium">Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h3 className="text-xl font-semibold text-gray-900">Account Settings</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" value={user.name} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input type="email" value={user.email} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" value={user.phone} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                  <div className="pt-4">
                    <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
                      Save Changes
                    </button>
                  </div>
                  <div className="border-t pt-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h4>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded" />
                        <span className="text-gray-700">Email notifications for orders</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded" />
                        <span className="text-gray-700">Promotional emails</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded" />
                        <span className="text-gray-700">SMS notifications</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
