import React from "react";
import { useDispatch } from "react-redux";
import {
  selectFurniture,
  placeFurniture,
} from "../store/slices/furnitureSlice";

const FurnitureItem = ({ item }) => {
  const dispatch = useDispatch();

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
        <p className="text-sm font-bold text-green-600">${item.price}</p>
      </div>
    </div>
  );
};

export default FurnitureItem;
