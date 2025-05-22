import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import LoadingAnimation from "../../components/LoadingAnimation";

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
        { isLoading ? <LoadingAnimation/> :
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
