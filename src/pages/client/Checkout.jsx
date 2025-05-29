import { useState } from "react";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const [cart, setCart] = useState(location.state?.items || []);
  const [showConfirm, setShowConfirm] = useState(false); // Show Popup message to confirm Delete
  const [itemToRemove, setItemToRemove] = useState(null); // Delete item

  function getTotal(){
    let total = 0
    cart.forEach((item) => {
      total += item.price * item.qty
    })
    return total
  }

  function removeFromCart(index){
    const newCart = cart.filter((item, i) => i !== index)
    setCart(newCart)
  }

  function changeQty(index, qty){
    const newQty = cart[index].qty + qty
    if(newQty <= 0){
      return
    } else {
      const newCart = [...cart]
      newCart[index].qty = newQty
      setCart(newCart)
    }
  }

  return (
    <div className="max-h-screen w-full p-6 relative ">
      <div className="w-[400px] h-[80px] shadow-2xl absolute bg-white mt-5 rounded-lg top-1 right-1 flex flex-col justify-center items-center">
        <p className="text-2xl text-secondary font-bold">
          
          Total: {" "}
          <span className="text-2xl text-secondary font-bold">{ getTotal().toFixed(2)}</span>
        </p>
        <button
          className="text-white bg-green-600 px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition-all duration-300"
        >
          Place Order
        </button>
      </div>
      <div className="w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        {cart.length === 0 ? (
          <p className="text-gray-600 text-center">
            No items selected for checkout.
          </p>
        ) : (
          <div className="space-y-4">
            {cart.map((item, index) => (
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
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      changeQty(index, -1)
                    }}
                    className="w-8 h-8 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer flex items-center justify-center"
                  >
                    <BiMinus />
                  </button>
                  <span className="w-6 text-center">{item.qty}</span>
                  <button
                    onClick={() => {
                        changeQty(index, 1)
                    }}
                    className="w-8 h-8 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer flex items-center justify-center"
                  >
                    <BiPlus />
                  </button>
                </div>

                {/* Total Price */}
                <div className="w-32 text-right text-md font-bold text-gray-800">
                  Rs. {(item.qty * item.price).toFixed(2)}
                </div>

                {/* Remove */}
                <button
                  onClick={() => {
                    setItemToRemove(index);
                    setShowConfirm(true);
                  }}
                  className="text-red-500 hover:text-red-700 text-xl ml-4 cursor-pointer"
                >
                  <BiTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Confirm Remove Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <h2 className="text-lg font-semibold mb-4">Remove item?</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to remove from the cart?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  removeFromCart(itemToRemove);
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

export default Checkout;
