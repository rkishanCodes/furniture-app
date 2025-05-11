import React, { useContext } from "react";
import { FurnitureContext } from "../context/FurnitureContext";
import FurnitureItem from "./FurnitureItem";

const FurnitureCatalog = () => {
  const { furnitureItems, isLoading } = useContext(FurnitureContext);

  if (isLoading) {
    return <div className="text-center text-gray-600 text-lg py-8">Loading furniture catalog...</div>;
  }

  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Furniture Catalog</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {furnitureItems.map((item) => (
          <FurnitureItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FurnitureCatalog;
