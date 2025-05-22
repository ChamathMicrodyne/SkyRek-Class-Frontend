import React, { useEffect, useState } from "react";
import { sampleProducts } from "../../assets/sampleData.js";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import LoadingAnimation from "../../components/LoadingAnimation.jsx";

function ProductsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading == true) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          setProducts(res.data);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  function deleteProduct(productId) {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Please login first");
      return;
    }

    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        toast.success("Product deleted successfully");
        setIsLoading(true);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }

  return (
    <div className="w-full h-full max-h-full p-5 bg-[#f4f4f5]">
      <div className="w-full h-full max-h-full bg-white rounded-xl p-6 shadow-lg">
        {isLoading ? <LoadingAnimation/>
          :
          <table className="w-full text-center">
            <thead>
              <tr>
                <th className="pb-[15px]">product Id</th>
                <th className="pb-[15px]">Name</th>
                <th className="pb-[15px]">Images</th>
                <th className="pb-[15px]">Labelled Price</th>
                <th className="pb-[15px]">Price</th>
                <th className="pb-[15px]">Stock</th>
                <th className="pb-[15px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.productId}</td>
                    <td>{item.name}</td>
                    <td>
                      <img src={item.images[0]} className="w-[50px] h-[50px]" />
                    </td>
                    <td>{item.labelledPrice}</td>
                    <td>{item.price}</td>
                    <td>{item.stock}</td>
                    <td>
                      <div className="flex justify-center items-center w-full">
                        <FaTrash
                          className="text-[15px] mx-2 cursor-pointer"
                          onClick={() => {
                            deleteProduct(item.productId);
                          }}
                        />
                        <FaEdit
                          className="text-[15px] mx-2 cursor-pointer"
                          onClick={() => {
                            navigate("/admin/edit-product", {
                              state: item,
                            });
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
        }
        <Link to="/admin/add-product">
          <div className="w-[70px] h-[45px] bg-green-400 absolute bottom-10 right-8 flex justify-center items-center border-b-1 border-t-1 rounded-[5px] cursor-pointer">
            <p className="text-4xl mt-[-8px]">+</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default ProductsPage;
