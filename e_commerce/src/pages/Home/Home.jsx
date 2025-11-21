import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filterProductByCategory, getAllProducts, getProductById ,searchProduct} from "../../redux/thunk/productThunk";
import { setSelectedCategory } from "../../redux/slices/productSlice";
import axios from "axios";
import { addToCart } from "../../redux/thunk/cartThunk";
import { getCart } from "../../redux/thunk/cartThunk";
import { Heart } from "lucide-react";
import { addToWishlist, getWishlist } from "../../redux/thunk/wishlistThunk";
export default function Home() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const products = useSelector((state) => state.product.allProducts);
  // const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  // const wishlistIds = wishlist?.items?.map((item) => item.productId);
  const [messages, setMessages] = useState({});
  console.log("user from home", user);
  useEffect(() => {
    if (user) {
      dispatch(getCart());
      dispatch(getWishlist());
    }
  }, [dispatch, user]);

  const handleCart = (id, stock) => {
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
  const handleNavigate = (id) => {
    console.log("product id fronm home page", id);
    dispatch(getProductById(id));
    navigator(`/product_detail/${id}`);
  };
  const [isInWishlist, setIsInWishlist] = useState(false);
  const handleWishlist = (productId) => {
    dispatch(addToWishlist(productId));
    dispatch(getWishlist());
    setIsInWishlist(!isInWishlist);
  };
  // 3. Save wishlist to localStorage
  useEffect(() => {
    if (wishlist?.items) {
      const ids = wishlist.items.map((i) => i.productId._id);
      localStorage.setItem("wishlistIds", JSON.stringify(ids));
    }
  }, [wishlist]);

  // 4. Get wishlistIds safely (from backend OR localStorage)
  const storedWishlistIds =
    JSON.parse(localStorage.getItem("wishlistIds")) || [];

  const wishlistIds =
    wishlist?.items?.map((item) => item.productId._id) ||
    JSON.parse(localStorage.getItem("wishlistIds")) ||
    [];
  console.log("wishlist ids", wishlistIds);
  const searchQuery = useSelector((state) => state.product.searchQuery);
  const selectedCategory = useSelector(
    (state) => state.product.selectedCategory
  );
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    console.log("category from home",category)
    dispatch(filterProductByCategory( category ));
  };
  if (products?.length <= 0) return <h1>loading</h1>;

  return (
    <>
      {}
      <div>
        <div>
          <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
              alt=""
              className="absolute inset-0 -z-10 size-full object-cover object-right md:object-center"
            />
            <div
              aria-hidden="true"
              className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
            >
              <div
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
                className="aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"
              ></div>
            </div>
            <div
              aria-hidden="true"
              className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:-top-112 sm:ml-16 sm:translate-x-0"
            >
              <div
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
                className="aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-20"
              ></div>
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
                  Shop with us
                </h2>
                <p className="mt-8 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
                  Discover curated collections of premium products delivered
                  straight to your door. Experience seamless shopping with
                  exclusive deals, fast shipping, and exceptional customer
                  service.
                </p>
              </div>
              <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                  <a href="#">
                    New Arrivals <span aria-hidden="true">&rarr;</span>
                  </a>
                  <a href="#">
                    Best Sellers <span aria-hidden="true">&rarr;</span>
                  </a>
                  <a href="#">
                    Sale Items <span aria-hidden="true">&rarr;</span>
                  </a>
                  <a href="#">
                    Gift Cards <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
                <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="flex flex-col-reverse gap-1">
                    <dt className="text-base/7 text-gray-300">
                      Products available
                    </dt>
                    <dd className="text-4xl font-semibold tracking-tight text-white">
                      10,000+
                    </dd>
                  </div>
                  <div className="flex flex-col-reverse gap-1">
                    <dt className="text-base/7 text-gray-300">
                      Happy customers
                    </dt>
                    <dd className="text-4xl font-semibold tracking-tight text-white">
                      50K+
                    </dd>
                  </div>
                  <div className="flex flex-col-reverse gap-1">
                    <dt className="text-base/7 text-gray-300">
                      Average delivery
                    </dt>
                    <dd className="text-4xl font-semibold tracking-tight text-white">
                      2-3 days
                    </dd>
                  </div>
                  <div className="flex flex-col-reverse gap-1">
                    <dt className="text-base/7 text-gray-300">
                      Money-back guarantee
                    </dt>
                    <dd className="text-4xl font-semibold tracking-tight text-white">
                      30 days
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div>
          <select value={selectedCategory} onChange={handleCategoryChange} className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer hover:border-gray-400 transition-colors">
            <option value="All">All</option>
            <option value="Mobile">Mobile</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Home And Kitchen"> Home And Kitchen</option>
          </select>
          <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Products you may like to view
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products?.data?.map((product) => {
                  console.log("product id-", product._id);
                  console.log("wishlistedId-", wishlistIds);
                  const isWishlisted = wishlistIds?.includes(product._id);
                  console.log("iswishlisted", isWishlisted);
                  return (
                    <div key={product._id} className="group relative">
                      <img
                        alt={product.imageAlt}
                        src={product.imageUrl}
                        className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                        onClick={() => handleNavigate(product._id)}
                      />
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            {product.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.description}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          ${product.price}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleCart(product._id, product.stock)}
                        >
                          Add to cart
                        </button>
                        <Heart
                          className="h-6 w-6"
                          fill={isWishlisted ? "red" : "none"}
                          color={isWishlisted ? "red" : "currentColor"}
                          onClick={() => handleWishlist(product._id)}
                        />
                      </div>

                      {messages[product._id] && (
                        <p className="text-red-900">{messages[product._id]}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
