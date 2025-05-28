import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import LoadingAnimation from "../../components/LoadingAnimation";
import { addToCart, getCart } from "../../utils/cart";

function ProductOverviewPage() {
  const params = useParams();
  const productId = params.id;
  const [status, setStatus] = useState("Loading"); //Loading, Success, Error
  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
      .then((res) => {
        setProduct(res.data);
        setStatus("Success");
      })
      .catch((err) => {
        setStatus("Error");
        toast.error("Error fetching product details");
      });
  }, []);

  return (
    <>
      {status === "Success" && (
        <div className="w-full max-h-screen bg-primary flex justify-center items-start py-10 px-4">
          <div className="bg-white w-full max-w-6xl rounded shadow-md p-6 md:p-10 flex flex-col md:flex-row gap-10">
            {/* Left Image Section */}
            <div className="w-full md:w-1/2 flex gap-4">
              {/* Vertical Thumbnails */}
              <div className="flex flex-col gap-2 items-center justify-center overflow-hidden overflow-y-scroll hide-scrollbar h-125 px-1">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    className={
                      "w-fit h-16 object-contain rounded cursor-pointer hover:ring-2 hover:ring-accent " +
                      (index == currentIndex && "border-accent border-2")
                    }
                    onClick={() => {
                      setCurrentIndex(index);
                    }}
                  />
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 rounded-md">
                <img
                  src={product.images[currentIndex]}
                  alt="main-product"
                  className="w-fit h-[500px] object-contain rounded-md"
                />
              </div>
            </div>

            {/* Right Detail Section */}
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              {/* Product Title */}
              <h1 className="text-2xl font-semibold text-gray-800">
                {product.name}
                {product.altNames.map((alt, i) => (
                  <span key={i} className="text-lg text-gray-500">
                    {" | " + alt}
                  </span>

                  
                ))}
              </h1>

              {/* Description */}
              <p className="text-gray-700 text-sm mt-2">
                {product.description}
              </p>

              {/* Price Display */}
              <div className="flex items-center gap-4 mt-2">
                <p className="text-2xl font-bold text-red-600">
                  Rs. {product.price.toFixed(2)}
                </p>
                {product.labelledPrice > product.price && (
                  <p className="text-lg line-through text-gray-500">
                    Rs. {product.labelledPrice.toFixed(2)}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6">
                <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-md cursor-pointer" onClick={() => {
                  console.log(getCart())
                  addToCart(product,1)
                  console.log(getCart())
                }}>
                  ADD TO CART
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md cursor-pointer">
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {status === "Loading" && <LoadingAnimation />}
    </>
  );
}

export default ProductOverviewPage;
