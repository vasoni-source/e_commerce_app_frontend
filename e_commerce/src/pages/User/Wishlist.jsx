import React, { useEffect ,useState} from "react";
import { useSelector } from "react-redux";
import { ShoppingBag } from "lucide-react";
import { useDispatch } from "react-redux";
import { getWishlist } from "../../redux/thunk/wishlistThunk";
import { addToCart } from "../../redux/thunk/cartThunk";
export default function Wishlist() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const user = useSelector((state) => state.user.user);
  const [messages, setMessages] = useState({});
  console.log("wishlist from redux ", wishlist);
  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);
  const handleAddToCart = (id, stock) => {
    console.log("stock ",stock);
    if (user) {
      if (stock > 0) {
        dispatch(addToCart({ productId: id, quantity: 1 }));
        setMessages((prev) => ({ ...prev, [id]: "" }));
      } else {
        setMessages((prev) => ({ ...prev, [id]: "Product is out of stock" }));
      }
    } else {
      navigator("/user/login");
    }
  };
console.log("wishlist items",wishlist.items)
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h3 className="text-xl font-semibold text-gray-900">My Wishlist</h3>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.items?.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 mb-2">{item.name}</h4>
              <p className="text-lg font-bold text-indigo-600 mb-3">
                ${item.price}
              </p>
              <button
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                onClick={() => handleAddToCart(item.productId._id, item.productId.stock)}
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
            {messages[item.productId._id] && (
              <p className="text-red-900">{messages[item.productId._id]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
