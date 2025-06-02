import React, { useEffect, useState } from "react";
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
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load products");
        setIsLoading(false);
      });
  }, []);

  const deleteProduct = (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Product deleted successfully");
        setProducts(products.filter(p => p.productId !== productId));
      })
      .catch((e) => {
        toast.error(e.response?.data?.message || "Failed to delete product");
      });
  };

  return (
    <div className="w-full h-full p-6 bg-[#f4f4f5]">
      <div className="bg-white rounded-xl shadow-lg p-6 h-full relative flex flex-col">
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <div className="overflow-hidden flex-1 overflow-y-auto hide-scrollbar">
            <div className="overflow-y-auto h-full pr-1 scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent">
              <table className="min-w-full text-sm text-center">
                <thead className="text-admin-accent bg-admin-secondary sticky top-0 z-10">
                  <tr>
                    <th className="py-3">Product ID</th>
                    <th className="py-3">Name</th>
                    <th className="py-3">Image</th>
                    <th className="py-3">Labelled Price</th>
                    <th className="py-3">Price</th>
                    <th className="py-3">Stock</th>
                    <th className="py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {products.map((product) => (
                    <tr key={product.productId} className="hover:bg-gray-100 transition" >
                      <td className="py-2">{product.productId}</td>
                      <td className="py-2">{product.name}</td>
                      <td className="py-2">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover mx-auto rounded"
                        />
                      </td>
                      <td className="py-2">₹{product.labelledPrice}</td>
                      <td className="py-2">₹{product.price}</td>
                      <td className="py-2">{product.stock}</td>
                      <td className="py-2">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => navigate("/admin/edit-product", { state: product })}
                            className="text-blue-600 hover:text-blue-800"
                            aria-label="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => deleteProduct(product.productId)}
                            className="text-red-600 hover:text-red-800"
                            aria-label="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

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
