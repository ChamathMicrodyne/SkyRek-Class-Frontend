import React, { useEffect, useState } from "react";
import { sampleProducts } from "../../assets/sampleData.js";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminProductsPage() {
  const [products, setProducts] = useState(sampleProducts);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
      .then((res) => {
        setProducts(res.data)
      });
  }, []);

  return (
    <div className="w-full h-full max-h-full p-5 bg-[#f4f4f5]">
      <div className="w-full h-full max-h-full bg-white rounded-xl p-6 shadow-lg">
        <table className="w-full text-center">
          <thead>
            <tr>
              <th className="pb-[15px]">product Id</th>
              <th className="pb-[15px]">Name</th>
              <th className="pb-[15px]">Images</th>
              <th className="pb-[15px]">Labelled Price</th>
              <th className="pb-[15px]">Price</th>
              <th className="pb-[15px]">Stock</th>
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
                </tr>
              );
            })}
          </tbody>
        </table>
        <Link to="/admin/add-product">
          <div className="w-[70px] h-[45px] bg-green-400 absolute bottom-10 right-8 flex justify-center items-center border-b-1 border-t-1 rounded-[5px] cursor-pointer">
            <p className="text-4xl mt-[-8px]">+</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AdminProductsPage;
