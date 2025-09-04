import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import LoadingAnimation from "../../components/LoadingAnimation";
import toast from "react-hot-toast";

function SearchProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          setProducts(res.data);
          setIsLoading(false);
        });
  },[query.length == 0]);

  return (
    <div className="w-full h-full flex flex-wrap justify-center items-center relative">
      <input
        type="text"
        placeholder="Search for products..."
        className="w-[300px] h-[40px] px-4 mb-4 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-accent absolute left-15 top-5 z-10"
        value={query}
        onChange={async (e) => {
          setQuery(e.target.value);
          setIsLoading(true);
          if (e.target.value.length == 0) {
            setProducts([]);
            setIsLoading(false);
            return;
          }
          try {
            const response = await axios.get(
              import.meta.env.VITE_BACKEND_URL +
                "/api/products/search/" +
                e.target.value
            );
            setProducts(response.data);
          } catch (err) {
            toast.error("Error fetching products");
            console.log(err);
          } finally {
            setIsLoading(false);
          }
        }}
      />
          {isLoading ? (
            <LoadingAnimation />
          ) : (
            products.map((product) => {
              return <ProductCard key={product.productId} product={product} />;
            })
          )}
    </div>
  );
}

export default SearchProducts;
