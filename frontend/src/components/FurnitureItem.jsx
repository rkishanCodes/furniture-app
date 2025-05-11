import React, { useContext } from "react";
import { FurnitureContext } from "../context/FurnitureContext";
import "./FurnitureItem.css";

const FurnitureItem = ({ item }) => {
  const { selectFurniture } = useContext(FurnitureContext);

  const handleDragStart = (e) => {
    // Set data to be transferred
    e.dataTransfer.setData("furniture", JSON.stringify(item));
    // Set the drag image (optional)
    const dragImage = new Image();
    dragImage.src = item.imageUrl;
    e.dataTransfer.setDragImage(dragImage, item.width / 2, item.height / 2);

    // Select the furniture item in context
    selectFurniture(item);
  };

  return (
    <div
      className="furniture-item"
      draggable={true}
      onDragStart={handleDragStart}
    >
      <img src={item.imageUrl} alt={item.name} className="furniture-image" />
      <div className="furniture-details">
        <h3>{item.name}</h3>
        <p>{item.dimensions}</p>
        <p className="furniture-price">${item.price}</p>
      </div>
    </div>
  );
};

export default FurnitureItem;
