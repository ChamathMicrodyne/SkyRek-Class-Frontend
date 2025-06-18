import React, { useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import ProductsPage from "./admin/ProductsPage";
import UsersPage from "./admin/UsersPage";
import OrdersPage from "./admin/OrdersPage";
import ReviewPage from "./admin/ReviewPage";
import AddProductPage from "./admin/AddProductPage";
import EditProductPage from "./admin/EditProductPage";
import AdminSidebar from "../components/AdminSideBar";
import axios from "axios";
import toast from "react-hot-toast";

function AdminPage() {
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Please login first");
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/check-admin",  {
        headers : {
          "Authorization" : "Bearer " + token
        }
      })
      .then((response) => {
        if (response.data.role == "admin"){
          
        } else {
          toast.error(response.data.message);
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        navigate("/");
      });
  }, []);

  return (
    <div className="w-full h-screen flex">
      <AdminSidebar />
      <div className="w-[calc(100%-300px)] h-full ">
        <Routes path="/*">
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/reviews" element={<ReviewPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
          <Route path="/edit-product" element={<EditProductPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPage;
