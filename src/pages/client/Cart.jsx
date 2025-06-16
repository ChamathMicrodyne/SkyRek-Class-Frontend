import { useState } from "react";
import { getCart, addToCart, removeFromCart, getTotal } from "../../utils/cart.js";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(getCart());
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (productId) => {
    setSelectedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="p-4 sm:p-6 w-full max-w-4xl mx-auto">
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center sm:text-left">Shopping Cart</h1>
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.productId} className="flex items-center justify-between bg-gray-50 p-3 rounded-md shadow-sm hover:shadow-md">
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.productId)}
                    onChange={() => handleCheckboxChange(item.productId)}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <img
                    src={item.images}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-full border "
                  />
                  <div className="text-sm">
                    <h2 className="font-semibold text-gray-800">{item.name}</h2>
                    <div className="text-xs">
                      {item.labelledPrice && (
                        <span className="line-through text-gray-400 mr-1">Rs. {item.labelledPrice}</span>
                      )}
                      <span className="text-indigo-600 font-semibold mr-1"><br />Rs. {item.price}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (item.qty > 1) {
                        addToCart(item, -1);
                        setCart(getCart());
                      }
                    }}
                    className="w-7 h-7 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded flex items-center justify-center"
                  >
                    <BiMinus />
                  </button>
                  <span className="w-5 text-center text-sm">{item.qty}</span>
                  <button
                    onClick={() => {
                      addToCart(item, 1);
                      setCart(getCart());
                    }}
                    className="w-7 h-7 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded flex items-center justify-center"
                  >
                    <BiPlus />
                  </button>
                </div>
                <div className="text-right w-20 text-sm ">
                  <div className="font-semibold text-gray-700">Rs. {(item.qty * item.price).toFixed(2)}</div>
                  <button
                    onClick={() => {
                      setItemToRemove(item);
                      setShowConfirm(true);
                    }}
                    className="text-red-500 hover:text-red-700 mt-1 text-base"
                  >
                    <BiTrash />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row sm:justify-between items-center mt-6 gap-4">
              <div className="text-lg font-bold text-gray-800">
                Total: Rs. {getTotal().toFixed(2)}
              </div>
              <button
                onClick={() => {
                  const itemsToBuy = selectedItems.length === 0 ? cart : cart.filter((item) =>
                    selectedItems.includes(item.productId)
                  );
                  navigate("/checkout", { state: { items: itemsToBuy } });
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md text-sm shadow"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center w-[90%] max-w-sm">
            <h2 className="text-lg font-semibold mb-3">Remove item?</h2>
            <p className="text-sm text-gray-600 mb-5">
              Are you sure you want to remove{" "}
              <strong>{itemToRemove?.name}</strong> from the cart?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  removeFromCart(itemToRemove.productId);
                  setCart(getCart());
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
