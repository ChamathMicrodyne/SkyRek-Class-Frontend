import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { mediaUpload } from "../../utils/mediaUpload";

export default function EditProductPage() {
  const location = useLocation();
  const [productId, setProductId] = useState(location.state.productId);
  const [name, setName] = useState(location.state.name);
  const [altNames, setAltNames] = useState(location.state.altNames.join(","));
  const [description, setDescription] = useState(location.state.description);
  const [images, setImages] = useState([]);
  const [imagePreviewURLs, setImagePreviewURLs] = useState([]);
  const [labelledPrice, setLabelledPrice] = useState(location.state.labelledPrice);
  const [price, setPrice] = useState(location.state.price);
  const [stock, setStock] = useState(location.state.stock);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const fileURLs = files.map((file) => URL.createObjectURL(file));
    setImagePreviewURLs(fileURLs);
  };

  async function UpdateProduct() {
    const token = localStorage.getItem("token");
    if (token == null) {
      toast.error("Please login first");
      return;
    }

    let imageUrls = location.state.images;
    const promisesArray = [];

    for (let i = 0; i < images.length; i++) {
      promisesArray[i] = mediaUpload(images[i]);
    }
    try {
      if (images.length > 0) {
        imageUrls = await Promise.all(promisesArray);
      }

      const altNamesArrays = altNames.split(",");
      const product = {
        productId: productId,
        name: name,
        altNames: altNamesArrays,
        description: description,
        images: imageUrls,
        labelledPrice: labelledPrice,
        price: price,
        stock: stock,
      };

      axios.put(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId, product, {
        headers : {
          "Authorization" : "Bearer " + token
        }
      }).then(() => {
        toast.success("Product updated successfully")
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
          Edit Product
        </h2>
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Product ID
            </label>
            <input
              type="text"
              disabled
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
              value={altNames}
              onChange={(e) => setAltNames(e.target.value)}
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

          {imagePreviewURLs.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {imagePreviewURLs.map((imageUrl, index) => (
                <div key={index} className="relative">
                  <img
                    src={imageUrl}
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
            onClick={UpdateProduct}
          >
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
}
