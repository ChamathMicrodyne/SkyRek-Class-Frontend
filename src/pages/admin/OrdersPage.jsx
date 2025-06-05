import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingAnimation from "../../components/LoadingAnimation.jsx";
import Modal from "react-modal";

Modal.setAppElement("#root");

function OrdersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch orders");
        setIsLoading(false);
      });
  }, [isLoading]);

  return (
    <div className="w-full h-full p-6 bg-[#f4f4f5]">
      <div className="bg-white rounded-xl shadow-lg p-6 h-full relative flex flex-col">
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <div className="overflow-hidden flex-1">
            <Modal
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              contentLabel="Order Details"
              className="max-w-3xl w-full p-6 bg-white rounded-2xl shadow-2xl mx-auto mt-20 outline-none"
              overlayClassName="fixed inset-0 bg-[#00000050] bg-opacity-30 flex items-start justify-center z-50"
            >
              {activeOrder && (
                <div>
                  <h2 className="text-2xl font-semibold text-admin-accent mb-4">
                    Order Details - {activeOrder.orderId}
                  </h2>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-700">
                    <div className="space-y-1.5">
                      <p>
                        <strong>Name:</strong> {activeOrder.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {activeOrder.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {activeOrder.phone}
                      </p>
                      <p>
                        <strong>Address:</strong> {activeOrder.address}
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <p>
                        <strong>Status:</strong>{" "}
                        <span
                          className={`font-semibold ${
                            activeOrder.status === "Complete" ? "text-green-600" :
                            activeOrder.status === "Pending" ? "text-yellow-500" : "text-red-500"
                          }`}
                        >
                          {activeOrder.status.toUpperCase()}
                        </span>
                        <select value="Change status"
                          onChange={async (e) => {
                            const updatedValue = e.target.value;
                            try {
                              const token = localStorage.getItem("token");
                              await axios.put(
                                import.meta.env.VITE_BACKEND_URL +
                                  "/api/orders/" +
                                  activeOrder.orderId +
                                  "/" +
                                  updatedValue,
                                {},
                                {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                }
                              );
                              setIsLoading(true);
                              const updatedOrder = {...activeOrder};
                              updatedOrder.status = updatedValue
                              setActiveOrder(updatedOrder)
                            } catch (err) {
                              toast.error("Error updating status");
                            }
                          }}
                        >
                          <option disabled>
                            Change status
                          </option>
                          <option value="Pending">Pending</option>
                          <option value="Complete">Complete</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Returned">Returned</option>
                        </select>
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(activeOrder.date).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Total:</strong> LKR{" "}
                        {activeOrder.total.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                      <p>
                        <strong>Labelled Total:</strong> LKR{" "}
                        {Number(activeOrder.labelledTotal).toLocaleString(
                          undefined,
                          { minimumFractionDigits: 2 }
                        )}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Products
                  </h3>

                  <table className="w-full text-sm mb-6">
                    <thead className="bg-admin-secondary text-admin-accent rounded overflow-hidden">
                      <tr>
                        <th className="text-left py-2 px-2 rounded-tl">No</th>
                        <th className="text-left py-2 px-3 rounded-tl">
                          Image
                        </th>
                        <th className="text-left py-2 px-3">Product</th>
                        <th className="text-left py-2 px-3">Price</th>
                        <th className="text-left py-2 px-3">Quantity</th>
                        <th className="text-left py-2 px-3 rounded-tr">
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {activeOrder.products.map((item, idx) => (
                        <tr key={idx} className=" hover:bg-gray-50">
                          <td className="py-3 px-3">{idx + 1}.</td>
                          <td className="py-3 px-3">
                            <img
                              src={item.productInfo.images[0]}
                              alt={item.productInfo.name}
                              className="w-10 h-10 rounded object-cover"
                            />
                          </td>
                          <td className="py-3 px-3">{item.productInfo.name}</td>
                          <td className="py-3 px-3">
                            LKR{" "}
                            {item.productInfo.price.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                            })}
                          </td>
                          <td className="py-3 px-3">{item.quantity}</td>
                          <td className="py-3 px-3">
                            LKR{" "}
                            {(
                              item.productInfo.price * item.quantity
                            ).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-5 py-2 bg-green-600 text-white rounded hover:bg-admin-accent transition"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </Modal>

            <div className="overflow-y-auto h-full pr-1 scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent">
              <table className="min-w-full text-sm text-center">
                <thead className="text-green-900 bg-green-100 sticky top-0 z-10">
                  <tr>
                    <th className="py-3">Order ID</th>
                    <th className="py-3">Name</th>
                    <th className="py-3">Email</th>
                    <th className="py-3">Address</th>
                    <th className="py-3">Phone</th>
                    <th className="py-3">Total</th>
                    <th className="py-3">Date</th>
                    <th className="py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {orders.map((order, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-100 transition cursor-pointer"
                      onClick={() => {
                        setActiveOrder(order);
                        setIsModalOpen(true);
                      }}
                    >
                      <td className="py-2">{order.orderId}</td>
                      <td className="py-2">{order.name}</td>
                      <td className="py-2">{order.email}</td>
                      <td className="py-2">{order.address}</td>
                      <td className="py-2">{order.phone}</td>
                      <td className="py-2">
                        LKR {Number(order.total).toLocaleString()}
                      </td>
                      <td className="py-2">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="py-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "Complete"
                              ? "bg-green-200 text-green-800"
                              : order.status === "Pending"
                              ? "bg-yellow-200 text-yellow-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;
