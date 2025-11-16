import React from 'react'
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { useSelector } from 'react-redux';
export default function ProductDetail() {
    // const product = {
    //     name: "Premium Wireless Headphones",
    //     category: "Electronics",
    //     brand: "AudioTech",
    //     price: 299.99,
    //     stock: 15,
    //     rating: 4.5,
    //     description: "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort padding. Perfect for music lovers, commuters, and professionals who demand the best audio quality.",
    //     imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
    //     images: [
    //       "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
    //       "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
    //       "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&h=800&fit=crop"
    //     ],
    //     seller: {
    //       name: "Premium Electronics Store",
    //       id: "507f1f77bcf86cd799439011"
    //     }
    //   };
    const product = useSelector((state)=>state.product.productDetail);
    console.log("product detail page ",product);
      const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${
              index < Math.floor(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : index < rating
                ? 'fill-yellow-200 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ));
      };
  return (
    <div className="min-h-screen bg-gray-50">
    {
      product? <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
           
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 font-medium">{product.brand}</p>
              <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.name}</h1>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} out of 5
                </span>
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <p className="text-sm text-green-600 font-medium mt-2">
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

          

            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Truck className="w-5 h-5 text-blue-600" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>1 year warranty included</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <RotateCcw className="w-5 h-5 text-blue-600" />
                <span>30-day return policy</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Category:</span> {product.category}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-semibold">Sold by:</span> {product.seller.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>:null
    }
  </div>
  )
}
