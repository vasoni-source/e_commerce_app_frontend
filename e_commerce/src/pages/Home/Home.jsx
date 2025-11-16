import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllProducts, getProductById } from "../../redux/thunk/productThunk";
import axios from "axios";
import { addToCart } from "../../redux/thunk/cartThunk";
export default function Home() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const products = useSelector((state) => state.product.allProducts);
  // console.log("products ",products)


  // async function getData(){
  //   const data = await axios.get("http://localhost:5000/product")
  //   console.log("data",data)
  // }
  useEffect(() => {
    dispatch(getAllProducts());
  
  }, [dispatch]);
  const handleCart =(id)=>{
    dispatch(addToCart({ productId: id, quantity: 1 }));
  }
  const handleNavigate = (id)=>{
    console.log("prosuct id fronm home page",id);
    dispatch(getProductById(id))
    navigator(`/product_detail/${id}`)
  }
  if(products?.length<=0) return <h1>loading</h1>
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
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat.
              </p>
            </div>
            <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                <a href="#">
                  Open roles <span aria-hidden="true">&rarr;</span>
                </a>
                <a href="#">
                  Internship program <span aria-hidden="true">&rarr;</span>
                </a>
                <a href="#">
                  Our values <span aria-hidden="true">&rarr;</span>
                </a>
                <a href="#">
                  Meet our leadership <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
              <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col-reverse gap-1">
                  <dt className="text-base/7 text-gray-300">
                    Offices worldwide
                  </dt>
                  <dd className="text-4xl font-semibold tracking-tight text-white">
                    12
                  </dd>
                </div>
                <div className="flex flex-col-reverse gap-1">
                  <dt className="text-base/7 text-gray-300">
                    Full-time colleagues
                  </dt>
                  <dd className="text-4xl font-semibold tracking-tight text-white">
                    300+
                  </dd>
                </div>
                <div className="flex flex-col-reverse gap-1">
                  <dt className="text-base/7 text-gray-300">Hours per week</dt>
                  <dd className="text-4xl font-semibold tracking-tight text-white">
                    40
                  </dd>
                </div>
                <div className="flex flex-col-reverse gap-1">
                  <dt className="text-base/7 text-gray-300">Paid time off</dt>
                  <dd className="text-4xl font-semibold tracking-tight text-white">
                    Unlimited
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Products you may like to view
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products?.data?.map((product) => (
                <div key={product._id} className="group relative">
                  <img
                    alt={product.imageAlt}
                    src={product.imageUrl}
                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                    onClick={()=>handleNavigate(product._id)}
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
                      {product.price}
                    </p>
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleCart(product._id)}>Add to cart</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
