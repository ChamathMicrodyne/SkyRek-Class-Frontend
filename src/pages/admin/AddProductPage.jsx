import React, { useState } from "react";
import toast from "react-hot-toast";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProductPage() {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altName, setAltName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);
  const [labelledPrice, setLabelledPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const fileURLs = files.map((file) => URL.createObjectURL(file));
    setPreviewURLs(fileURLs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      productId,
      name,
      altName,
      description,
      images,
      labelledPrice,
      price,
      stock,
    };
    console.log(productData);
    // You may want to clear the form or send this to backend
  };

  async function addProduct(e) {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Please login first");
      return;
    }
    if (images.length <= 0) {
      toast.error("Please select at least one image");
      return;
    }

    const promisesArray = [];

    for (let i = 0; i < images.length; i++) {
      promisesArray[i] = mediaUpload(images[i]);
    }
    try {
      const imageUrls = await Promise.all(promisesArray);
      const altNameArrays = altName.split(",");
      const product = {
        productId: productId,
        name: name,
        altName: altNameArrays,
        description: description,
        images: imageUrls,
        labelledPrice: labelledPrice,
        price: price,
        stock: stock,
      };

      axios.post(import.meta.env.VITE_BACKEND_URL + "/api/products", product, {
        headers : {
          "Authorization" : "Bearer " + token
        }
      }).then((res) => {
        toast.success("Product add successfully")
        navigate("/admin/products")
      }).catch((e) => {
        toast.error(e.response.data.message)
      })
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="w-full h-full max-h-full p-5 bg-[#f4f4f5]">
      <div className="w-full h-full max-h-full bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Add New Product
        </h2>
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Product ID
            </label>
            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product ID"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Main product name"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Alternative Name
            </label>
            <input
              type="text"
              value={altName}
              onChange={(e) => setAltName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Optional name (Ex: Orange, Lime, Lemon)"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Stock Quantity
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Labelled Price
            </label>
            <input
              type="number"
              value={labelledPrice}
              onChange={(e) => setLabelledPrice(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Selling Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Product Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a detailed product description..."
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Upload Product Images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          {previewURLs.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {previewURLs.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-50 object-cover rounded-lg border"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
            onClick={addProduct}
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
