import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Room from "./Room";
import DraggableFurniture from "./DraggableFurniture";
import "./PlacementCanvas.css";
import {
  selectSelectedFurniture,
  selectPlacedFurniture,
  placeFurniture,
} from "../store/slices/furnitureSlice";
import DesignSummary from "./DesignSummary";

import  emptyRoom  from "../assets/empty.jpg";

const PlacementCanvas = () => {
  const selectedFurniture = useSelector(selectSelectedFurniture);
  const placedFurniture = useSelector(selectPlacedFurniture);
  const dispatch = useDispatch();

  console.log(placedFurniture);

  const canvasRef = useRef(null);
  const [roomDimensions, setRoomDimensions] = useState({
    width: 700,
    height: 400,
  });
  const [backgroundImage, setBackgroundImage] = useState(emptyRoom);

  const handleDrop = (e) => {
    e.preventDefault();

    // Get the canvas boundaries
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    // Calculate the position relative to the canvas
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // If the furniture is coming from the catalog (not already placed)
    if (selectedFurniture && !e.dataTransfer.getData("text/plain")) {
      dispatch(
        placeFurniture({
          item: selectedFurniture,
          position: { x, y },
        })
      );
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleBackgroundImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBackgroundImage(imageUrl);
    }
  };

  return (
    <div className="placement-canvas-container">
      <DesignSummary/>
      <div className="mb-4">
        <label className="mr-2">Upload Room Background:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleBackgroundImageChange}
        />
      </div>

      <div
        className="placement-canvas"
        ref={canvasRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          width: `${roomDimensions.width}px`,
          height: `${roomDimensions.height}px`,
        }}
      >
        <Room dimensions={roomDimensions} backgroundImage={backgroundImage} />

        {placedFurniture.map((item) => (
          <DraggableFurniture key={item.id} item={item} />
        ))}
      </div>

      <div className="room-controls">
        <label>
          Room Width:
          <input
            type="range"
            min="300"
            max="800"
            value={roomDimensions.width}
            onChange={(e) =>
              setRoomDimensions({
                ...roomDimensions,
                width: Number(e.target.value),
              })
            }
          />
          {roomDimensions.width}px
        </label>

        <label>
          Room Height:
          <input
            type="range"
            min="200"
            max="600"
            value={roomDimensions.height}
            onChange={(e) =>
              setRoomDimensions({
                ...roomDimensions,
                height: Number(e.target.value),
              })
            }
          />
          {roomDimensions.height}px
        </label>
      </div>
    </div>
  );
};

export default PlacementCanvas;
