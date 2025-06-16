import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import LoadingAnimation from "../../components/LoadingAnimation";
import { addToCart } from "../../utils/cart";

function ProductOverviewPage() {
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.id;
  const [status, setStatus] = useState("Loading");
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


  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <>
      {status === "Success" && (
        <div className="w-full min-h-screen bg-primary flex justify-center items-start py-6 px-3">
          <div className="bg-white w-full max-w-6xl rounded shadow-md p-4 sm:p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-10">
            {/* Left Section - Product Images */}
            <div className="w-full md:w-1/2 flex flex-col items-center gap-4">
              {/* Main Image */}
              <div className="w-full flex justify-center items-center rounded-md overflow-hidden bg-gray-50 border border-gray-200 p-4">
                <img
                  src={product.images[currentIndex]}
                  alt="main-product"
                  className="max-h-[400px] w-auto object-contain"
                />
              </div>

              {/* Thumbnails Below Main Image */}
              <div
                ref={scrollRef}
                className="w-full flex overflow-x-auto gap-3 mt-2 py-1 px-1 scrollbar-hide cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
              >
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    className={`min-w-[4rem] rounded-md p-1 cursor-pointer transition duration-200 ${
                      index === currentIndex
                        ? "border-pink-500 ring-2 ring-pink-300"
                        : "ring-pink-300 border hover:border-pink-300"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <img
                      src={img}
                      alt={`thumbnail-${index}`}
                      className="h-16 w-16 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Section - Details */}
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              {/* Title */}
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
                {product.name}
                {product.altNames.map((alt, i) => (
                  <span key={i} className="text-lg text-gray-500">
                    {" | " + alt}
                  </span>
                ))}
              </h1>

              {/* Description */}
              <p className="text-gray-700 text-sm sm:text-base mt-1">
                {product.description}
              </p>

              {/* Price */}
              <div className="flex items-center gap-4 mt-2">
                <p className="text-xl sm:text-2xl font-bold text-red-600">
                  Rs. {product.price.toFixed(2)}
                </p>
                {product.labelledPrice > product.price && (
                  <p className="text-sm sm:text-lg line-through text-gray-500">
                    Rs. {product.labelledPrice.toFixed(2)}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-md"
                  onClick={() => {
                    addToCart(product, 1);
                    toast.success("Added to cart");
                  }}
                >
                  ADD TO CART
                </button>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md"
                  onClick={() => {
                    navigate("/checkout", {
                      state: {
                        items: [
                          {
                            productId: product.productId,
                            name: product.name,
                            images: product.images[0],
                            price: product.price,
                            labelledPrice: product.labelledPrice,
                            qty: 1,
                          },
                        ],
                      },
                    });
                  }}
                >
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
