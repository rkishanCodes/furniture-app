import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectPlacedFurniture } from "../store/slices/furnitureSlice";

const DesignSwitcher = () => {
  const [designs, setDesigns] = useState(() => {
    return JSON.parse(localStorage.getItem("roomDesigns") || "[]");
  });
  const [selectedDesign, setSelectedDesign] = useState(null);
  const placedFurniture = useSelector(selectPlacedFurniture);

  // Load designs from localStorage
  const loadDesigns = () => {
    const savedDesigns = JSON.parse(
      localStorage.getItem("roomDesigns") || "[]"
    );
    setDesigns(savedDesigns);
  };

  // View left and right design navigation
  const [currentDesignIndex, setCurrentDesignIndex] = useState(0);

  const handlePreviousDesign = () => {
    if (designs.length === 0) return;
    const newIndex =
      currentDesignIndex > 0 ? currentDesignIndex - 1 : designs.length - 1;
    setCurrentDesignIndex(newIndex);
    setSelectedDesign(designs[newIndex]);
  };

  const handleNextDesign = () => {
    if (designs.length === 0) return;
    const newIndex =
      currentDesignIndex < designs.length - 1 ? currentDesignIndex + 1 : 0;
    setCurrentDesignIndex(newIndex);
    setSelectedDesign(designs[newIndex]);
  };

  return (
    <div className="mb-8 p-4 bg-white rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Saved Designs</h3>

      <button
        onClick={loadDesigns}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600 transition"
      >
        Load Saved Designs
      </button>

      {designs.length > 0 ? (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePreviousDesign}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-full"
            >
              &larr;
            </button>

            <span className="text-lg font-medium">
              {selectedDesign ? selectedDesign.name : "Select a design"}
            </span>

            <button
              onClick={handleNextDesign}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-full"
            >
              &rarr;
            </button>
          </div>

          {selectedDesign && (
            <div className="p-3 border rounded bg-gray-50">
              <p>
                <strong>Name:</strong> {selectedDesign.name}
              </p>
              <p>
                <strong>Created:</strong>{" "}
                {new Date(selectedDesign.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Furniture Items:</strong>{" "}
                {selectedDesign.furniture.length}
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500">
          No saved designs found. Create and save a design first.
        </p>
      )}

      <div className="mt-4">
        <h4 className="font-medium mb-2">Current Design Stats</h4>
        <p>
          <strong>Furniture Items:</strong> {placedFurniture.length}
        </p>
      </div>
    </div>
  );
};

export default DesignSwitcher;
