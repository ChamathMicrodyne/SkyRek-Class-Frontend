import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading == true) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          setProducts(res.data);
          setIsLoading(false);
        });
    }
  },[isLoading]);

  return (
    <div className="w-full h-full flex flex-wrap justify-center items-center ">
        { isLoading ?
          <div className="w-full h-full flex justify-center items-center">
            <div className="w-[60px] h-[60px] border-[5px] border-gray-200 border-t-blue-400 rounded-full animate-spin"></div>
          </div> 
          :
            products.map((product) => {
                return (
                    <ProductCard key={product.productId} product={product}/>
                )
            })
        }
    </div>
  );
}

export default ProductPage;
