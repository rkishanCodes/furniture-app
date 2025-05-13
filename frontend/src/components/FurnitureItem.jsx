import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFurniture,
  placeFurniture,
  updateQuantity,
  selectQuantities,
} from "../store/slices/furnitureSlice";

const FurnitureItem = ({ item }) => {
  const dispatch = useDispatch();
  const quantities = useSelector(selectQuantities);
  const quantity = quantities[item.id] || 0;

  const handleDragStart = (e) => {
    e.dataTransfer.setData("furniture", JSON.stringify(item));
    const dragImage = new Image();
    dragImage.src = item.imageUrl;
    e.dataTransfer.setDragImage(dragImage, item.width / 2, item.height / 2);
    dispatch(selectFurniture(item));
  };

  const handleItemClick = () => {
    const defaultX = 250;
    const defaultY = 200;
    dispatch(placeFurniture({ item, position: { x: defaultX, y: defaultY } }));
  };

  const handleIncrementQuantity = (e) => {
    e.stopPropagation(); // Prevent triggering the parent onClick
    const defaultX = 250 + (Math.random() * 100 - 50); // Add some randomness to position
    const defaultY = 200 + (Math.random() * 100 - 50);
    dispatch(placeFurniture({ item, position: { x: defaultX, y: defaultY } }));
  };

  const handleDecrementQuantity = (e) => {
    e.stopPropagation(); // Prevent triggering the parent onClick
    if (quantity > 0) {
      dispatch(updateQuantity({ id: item.id, amount: -1 }));
      // Find the last placed item of this type and remove it
      // This would require finding the last placed instance of this furniture type
      // Implementation depends on how you want to handle this behavior
    }
  };

  return (
    <div
      className="bg-gray-100 rounded-lg p-3 shadow-md cursor-grab transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
      draggable={true}
      onDragStart={handleDragStart}
      onClick={handleItemClick}
    >
      <div className="w-full h-40 flex items-center justify-center bg-gray-100 rounded mb-3">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div className="text-center">
        <h3 className="text-base font-semibold mb-1">{item.name}</h3>
        <p className="text-sm text-gray-600 mb-1">{item.dimensions}</p>
        <p className="text-sm font-bold text-green-600"> ₹{item.price}</p>

        {/* Add quantity controls */}
        <div className="flex items-center justify-center mt-2">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded-l"
            onClick={handleDecrementQuantity}
          >
            -
          </button>
          <span className="bg-white px-4 py-1">{quantity}</span>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-2 rounded-r"
            onClick={handleIncrementQuantity}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default FurnitureItem;
