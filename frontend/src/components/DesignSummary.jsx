import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPlacedFurniture,
  selectQuantities,
  clearPlacedFurniture,
} from "../store/slices/furnitureSlice";

const DesignSummary = () => {
  const placedFurniture = useSelector(selectPlacedFurniture);
  const quantities = useSelector(selectQuantities);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  // Calculate total items and total price
  const totalItems = Object.values(quantities).reduce(
    (sum, qty) => sum + qty,
    0
  );

  // Group furniture by type and calculate totals
  const furnitureSummary = {};
  placedFurniture.forEach((item) => {
    const originalId = item.id.split("-")[1]; // Extract original ID from placed ID

    if (!furnitureSummary[originalId]) {
      furnitureSummary[originalId] = {
        id: originalId,
        name: item.name,
        price: item.price,
        count: 1,
        totalPrice: item.price,
      };
    } else {
      furnitureSummary[originalId].count++;
      furnitureSummary[originalId].totalPrice += item.price;
    }
  });

  const totalPrice = Object.values(furnitureSummary).reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  const handleClearDesign = () => {
    if (window.confirm("Are you sure you want to clear your design?")) {
      dispatch(clearPlacedFurniture());
      setOrderStatus(null);
    }
  };

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      setOrderStatus(null);

      // Format the order items for the API request
      const orderItems = Object.entries(furnitureSummary).map(([id, item]) => ({
        productId: id,
        quantity: item.count,
      }));

      // Send the order to the API
      const response = await fetch("http://localhost:5050/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add authorization if needed
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items: orderItems }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create order");
      }

      const data = await response.json();

      // Show success message
      setOrderStatus({
        success: true,
        message: "Order added to cart successfully!",
        orderId: data.id,
      });

      // Optionally clear the design after adding to cart
      // dispatch(clearPlacedFurniture());
    } catch (error) {
      console.error("Error adding to cart:", error);
      setOrderStatus({
        success: false,
        message: error.message || "Failed to add items to cart",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-semibold">Design Summary</h2>
        <div className="flex items-center">
          <span className="mr-2">
            {totalItems} item{totalItems !== 1 ? "s" : ""}
          </span>
          <span className="text-lg font-bold text-green-600">
            ₹{totalPrice.toFixed(2)}
          </span>
          <button className="ml-4 text-gray-500">{isOpen ? "▲" : "▼"}</button>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4">
          {orderStatus && (
            <div
              className={`p-3 mb-4 rounded ${
                orderStatus.success
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {orderStatus.message}
              {orderStatus.orderId && (
                <div className="mt-1 text-sm">
                  Order ID: {orderStatus.orderId}
                </div>
              )}
            </div>
          )}

          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Item</th>
                <th className="text-center py-2">Quantity</th>
                <th className="text-right py-2">Price</th>
                <th className="text-right py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(furnitureSummary).map(([id, item]) => (
                <tr key={id} className="border-b">
                  <td className="py-2">{item.name}</td>
                  <td className="text-center py-2">{item.count}</td>
                  <td className="text-right py-2">${item.price.toFixed(2)}</td>
                  <td className="text-right py-2">
                    ${item.totalPrice.toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="font-bold">
                <td className="py-2">Total</td>
                <td className="text-center py-2">{totalItems}</td>
                <td className="text-right py-2"></td>
                <td className="text-right py-2"> ₹{totalPrice.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4 flex justify-between">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleClearDesign}
            >
              Clear Design
            </button>

            <button
              className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              } ${totalItems === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={handleAddToCart}
              disabled={isLoading || totalItems === 0}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignSummary;
