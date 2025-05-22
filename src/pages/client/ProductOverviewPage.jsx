import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/ImageSlider";
import LoadingAnimation from "../../components/LoadingAnimation";

function ProductOverviewPage() {
  const params = useParams();
  const productId = params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("Loading"); //Loading, Success, Error
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (isLoading == true) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
        .then((res) => {
          setProduct(res.data);
          setIsLoading(false);
          setStatus("Success");
        })
        .catch((err) => {
          setStatus("Error");
          toast.error("Error fetching product details");
        });
    }
  }, [isLoading]);

  return (
    <>
      {status == "Success" && (
        <div className="w-full h-screen flex">
          <div className="w-[50%] h-full">
            <ImageSlider images={product.images} />
          </div>
          <div className="w-[50%] h-full bg-blue-400"></div>
        </div>
      )}
      {status == "Loading" && <LoadingAnimation />}
    </>
  );
}

export default ProductOverviewPage;
