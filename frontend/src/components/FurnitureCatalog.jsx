import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FurnitureItem from "./FurnitureItem";
import {
  selectFurnitureItems,
  selectIsLoading,
  loadFurnitureItems,
} from "../store/slices/furnitureSlice";

const FurnitureCatalog = () => {
  const furnitureItems = useSelector(selectFurnitureItems);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFurnitureItems());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="text-center text-gray-600 text-lg py-8">
        Loading furniture catalog...
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Furniture Catalog
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {furnitureItems.map((item) => (
          <FurnitureItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FurnitureCatalog;
