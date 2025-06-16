import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const [cart, setCart] = useState(location.state?.items || []);
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  function getTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.qty;
    });
    return total;
  }

  function removeFromCart(index) {
    const newCart = cart.filter((item, i) => i !== index);
    setCart(newCart);
  }

  function changeQty(index, qty) {
    const newQty = cart[index].qty + qty;
    if (newQty <= 0) {
      return;
    } else {
      const newCart = [...cart];
      newCart[index].qty = newQty;
      setCart(newCart);
    }
  }

  async function placeOrder() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to place order");
      return;
    }

    const orderInfomation = {
      products: [],
      phone: phone,
      address: address,
    };

    for (let i = 0; i < cart.length; i++) {
      const item = {
        productId: cart[i].productId,
        quantity: cart[i].qty,
      };
      orderInfomation.products[i] = item;
    }

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/orders",
        orderInfomation,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      toast.success("Order placed successfully");
    } catch (err) {
      console.log(err);
      toast.error("Error placing order");
      return;
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen w-full py-10">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Checkout</h1>

        {/* Cart Items List */}
        <div className="space-y-4">
          {cart.map((item, index) => (
            <div key={item.productId} className="flex items-center justify-between p-4 bg-gray-100 rounded-md shadow-sm">
              {/* Item Details */}
              <div className="flex items-center space-x-4">
                <img src={item.images} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                <div>
                  <h2 className="font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-sm text-gray-600">P-ID: {item.productId}</p>
                  <div className="mt-2">
                    {item.labelledPrice && (
                      <span className="line-through text-gray-400 text-sm mr-2">Rs. {item.labelledPrice}</span>
                    )}
                    <span className="text-indigo-600 font-semibold"><br />Rs. {item.price}</span>
                  </div>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => changeQty(index, -1)}
                  className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center cursor-pointer"
                >
                  <BiMinus />
                </button>
                <span className="text-center">{item.qty}</span>
                <button
                  onClick={() => changeQty(index, 1)}
                  className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center cursor-pointer"
                >
                  <BiPlus />
                </button>
              </div>

              {/* Total Price and Remove Button */}
              <div className="flex items-center justify-end space-x-4">
                <div className="text-gray-800 font-semibold">Rs. {(item.qty * item.price).toFixed(2)}</div>
                <button
                  onClick={() => {
                    setItemToRemove(index);
                    setShowConfirm(true);
                  }}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <BiTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Total Price */}
        <div className="mt-6 flex justify-between items-center">
          <p className="text-lg font-bold text-gray-800">Total: Rs. {getTotal().toFixed(2)}</p>
        </div>

        {/* Phone and Address Inputs */}
        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Phone number"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <textarea
            placeholder="Delivery address"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* Place Order Button */}
        <button
          className="w-full bg-green-600 text-white py-3 rounded-lg mt-6 hover:bg-green-700 focus:outline-none cursor-pointer"
          onClick={placeOrder}
        >
          Place Order
        </button>
      </div>

      {/* Remove Item Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-lg font-semibold mb-4">Remove item?</h2>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to remove this item from the cart?</p>
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
