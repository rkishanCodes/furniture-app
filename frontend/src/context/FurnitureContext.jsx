import React, { createContext, useState, useEffect } from "react";
import { furnitureData } from "../data/furnitureData.js";

export const FurnitureContext = createContext();

export const FurnitureProvider = ({ children }) => {
  const [furnitureItems, setFurnitureItems] = useState([]);
  const [selectedFurniture, setSelectedFurniture] = useState(null);
  const [placedFurniture, setPlacedFurniture] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for a more realistic experience
    const timer = setTimeout(() => {
      setFurnitureItems(furnitureData);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const selectFurniture = (item) => {
    setSelectedFurniture(item);
  };

  const placeFurniture = (item, position) => {
    const placedItem = {
      ...item,
      id: `placed-${item.id}-${Date.now()}`,
      position,
    };

    setPlacedFurniture([...placedFurniture, placedItem]);
  };

  const updateFurniturePosition = (id, newPosition) => {
    setPlacedFurniture(
      placedFurniture.map((item) =>
        item.id === id ? { ...item, position: newPosition } : item
      )
    );
  };

  const removePlacedFurniture = (id) => {
    setPlacedFurniture(placedFurniture.filter((item) => item.id !== id));
  };

  // New function to save design to localStorage instead of backend
  const saveDesign = (designName) => {
    const design = {
      id: Date.now(),
      name: designName,
      furniture: placedFurniture,
      createdAt: new Date().toISOString(),
    };

    // Get existing designs from localStorage
    const savedDesigns = JSON.parse(
      localStorage.getItem("roomDesigns") || "[]"
    );
    savedDesigns.push(design);

    // Save updated designs back to localStorage
    localStorage.setItem("roomDesigns", JSON.stringify(savedDesigns));

    return design;
  };

  return (
    <FurnitureContext.Provider
      value={{
        furnitureItems,
        selectedFurniture,
        placedFurniture,
        isLoading,
        selectFurniture,
        placeFurniture,
        updateFurniturePosition,
        removePlacedFurniture,
        saveDesign,
      }}
    >
      {children}
    </FurnitureContext.Provider>
  );
};
