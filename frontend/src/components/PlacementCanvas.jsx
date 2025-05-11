import React, { useContext, useRef, useState } from "react";
import { FurnitureContext } from "../context/FurnitureContext";
import Room from "./Room";
import DraggableFurniture from "./DraggableFurniture";
import "./PlacementCanvas.css";

const PlacementCanvas = () => {
  const { selectedFurniture, placeFurniture, placedFurniture } =
    useContext(FurnitureContext);
  const canvasRef = useRef(null);
  const [roomDimensions, setRoomDimensions] = useState({
    width: 500,
    height: 400,
  });
  const [designName, setDesignName] = useState("My Room Design");
  const { saveDesign } = useContext(FurnitureContext);
  const [backgroundImage, setBackgroundImage] = useState(null);

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
      placeFurniture(selectedFurniture, { x, y });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleSaveDesign = () => {
    const saved = saveDesign(designName);
    alert(`Design "${saved.name}" saved!`);
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
      <h2>Room Design</h2>

      <div className="design-controls">
        <input
          type="text"
          value={designName}
          onChange={(e) => setDesignName(e.target.value)}
          placeholder="Design Name"
          className="design-name-input"
        />
        <button onClick={handleSaveDesign} className="save-design-btn">
          Save Design
        </button>
      </div>

      <div className="mb-4">
        <label className="mr-2">Upload Room Background:</label>
        <input type="file" accept="image/*" onChange={handleBackgroundImageChange} />
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
