import { useEffect, useState } from "react";
import { getCart, addToCart, removeFromCart } from "../../utils/cart.js";
import { BiTrash } from "react-icons/bi";

const Cart = () => {
  const [cart, setCart] = useState(getCart());
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const handleQuantityChange = (product, delta) => {
    addToCart(product, delta);
    setCart(getCart());
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
    setCart(getCart());
  };

  const calculateTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm"
              >
                {/* Image */}
                <img
                  src={item.images}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-full"
                />

                {/* Name + Info */}
                <div className="flex-1 px-4">
                  <h2 className="text-md font-semibold">{item.name}</h2>
                  <p className="text-xs text-gray-500">{item.productId}</p>
                  <div className="text-sm mt-1">
                    {item.labelledPrice && (
                      <span className="line-through text-gray-400 mr-2">
                        Rs. {item.labelledPrice}
                      </span>
                    )}
                    <span className="text-indigo-600 font-semibold">
                      Rs. {item.price}
                    </span>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      item.qty > 1 && handleQuantityChange(item, -1)
                    }
                    className="w-8 h-8 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
                  >
                    −
                  </button>
                  <span className="w-6 text-center">{item.qty}</span>
                  <button
                    onClick={() => handleQuantityChange(item, 1)}
                    className="w-8 h-8 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Total Price */}
                <div className="w-32 text-right text-md font-bold text-gray-800">
                  Rs. {(item.qty * item.price).toFixed(2)}
                </div>

                {/* Remove */}
                <button
                  onClick={() => {
                    setItemToRemove(item.productId);
                    setShowConfirm(true);
                  }}
                  className="text-red-500 hover:text-red-700 text-xl ml-4 cursor-pointer"
                >
                  <BiTrash />
                </button>
              </div>
            ))}

            {/* Cart Total */}
            <div className="flex justify-end items-center mt-8">
              <h2 className="text-xl font-bold mr-6">
                Total: Rs. {calculateTotal().toFixed(2)}
              </h2>
              <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <h2 className="text-lg font-semibold mb-4">Remove item?</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to remove{" "}
              <strong>{itemToRemove?.name}</strong> from the cart?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  handleRemove(itemToRemove.productId);
                  setShowConfirm(false);
                  setItemToRemove(null);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setItemToRemove(null);
                }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
