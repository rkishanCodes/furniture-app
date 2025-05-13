import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateFurniturePosition,
  removePlacedFurniture,
  selectQuantities,
} from "../store/slices/furnitureSlice";
import "./DraggableFurniture.css";

const DraggableFurniture = ({ item }) => {
  const dispatch = useDispatch();
  const [isDragging, setIsDragging] = useState(false);
  const furnitureRef = useRef(null);
  const quantities = useSelector(selectQuantities);

  // Extract the original item ID from the placed furniture ID
  const originalItemId = item.id.split("-")[1];
  const currentQuantity = quantities[originalItemId] || 0;

  // Track the initial click position relative to the furniture item
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleDragStart = (e) => {
    setIsDragging(true);

    // Calculate the offset from the mouse position to the top-left corner of the furniture
    const rect = furnitureRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    setDragOffset({ x: offsetX, y: offsetY });

    // Required for Firefox
    e.dataTransfer.setData("text/plain", item.id);

    // Make the ghost image transparent
    const img = new Image();
    img.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"; // 1px transparent GIF
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDrag = (e) => {
    if (!e.clientX || !e.clientY) return; // Sometimes drag events fire with clientX/Y of 0

    const canvasRect =
      furnitureRef.current.parentElement.getBoundingClientRect();

    // Calculate new position considering the offset
    const newX = e.clientX - canvasRect.left - dragOffset.x;
    const newY = e.clientY - canvasRect.top - dragOffset.y;

    // Update the position in Redux store
    dispatch(
      updateFurniturePosition({
        id: item.id,
        newPosition: {
          x: newX + item.width / 2,
          y: newY + item.height / 2,
        },
      })
    );
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDoubleClick = () => {
    dispatch(removePlacedFurniture(item.id));
  };

  return (
    <div
      ref={furnitureRef}
      className={`draggable-furniture ${isDragging ? "dragging" : ""}`}
      draggable="true"
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onDoubleClick={handleDoubleClick}
      style={{
        left: `${item.position.x - item.width / 2}px`,
        top: `${item.position.y - item.height / 2}px`,
        width: `${item.width}px`,
        height: `${item.height}px`,
        backgroundImage: `url(${item.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="furniture-tooltip">
        {item.name}
        <br />
        {currentQuantity > 1 && (
          <span>
            Item {currentQuantity} of {currentQuantity}
          </span>
        )}
        <br />
        Double-click to remove
      </div>
    </div>
  );
};

export default DraggableFurniture;
