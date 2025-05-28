import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const selectedItems = location.state?.items || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {selectedItems.length === 0 ? (
        <p>No items selected for checkout.</p>
      ) : (
        selectedItems.map(item => (
          <div key={item.productId} className="mb-2">
            {item.name} - Rs. {item.price} x {item.qty}
          </div>
        ))
      )}
    </div>
  );
};

export default Checkout;
