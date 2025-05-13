import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  furnitureItems: [],
  selectedFurniture: null,
  placedFurniture: [],
  isLoading: true,
  // Add a new field to track quantities of each furniture item
  quantities: {},
};

export const furnitureSlice = createSlice({
  name: "furniture",
  initialState,
  reducers: {
    setFurnitureItems: (state, action) => {
      state.furnitureItems = action.payload;
      // Initialize quantities for each furniture item
      action.payload.forEach((item) => {
        if (!state.quantities[item.id]) {
          state.quantities[item.id] = 0;
        }
      });
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    selectFurniture: (state, action) => {
      state.selectedFurniture = action.payload;
    },
    placeFurniture: (state, action) => {
      const { item, position } = action.payload;
      const placedItem = {
        ...item,
        id: `placed-${item.id}-${Date.now()}`,
        position,
      };
      state.placedFurniture.push(placedItem);

      // Increment the quantity for this furniture item
      state.quantities[item.id] = (state.quantities[item.id] || 0) + 1;
    },
    updateFurniturePosition: (state, action) => {
      const { id, newPosition } = action.payload;
      const itemIndex = state.placedFurniture.findIndex(
        (item) => item.id === id
      );
      if (itemIndex !== -1) {
        state.placedFurniture[itemIndex].position = newPosition;
      }
    },
    removePlacedFurniture: (state, action) => {
      const removedItem = state.placedFurniture.find(
        (item) => item.id === action.payload
      );
      if (removedItem) {
        // Extract the original item id from the placed item id format "placed-originalId-timestamp"
        const originalItemId = removedItem.id.split("-")[1];
        // Decrement the quantity for this furniture type
        if (state.quantities[originalItemId] > 0) {
          state.quantities[originalItemId] -= 1;
        }
      }

      state.placedFurniture = state.placedFurniture.filter(
        (item) => item.id !== action.payload
      );
    },
    // Add a new action to update quantity directly
    updateQuantity: (state, action) => {
      const { id, amount } = action.payload;
      state.quantities[id] = Math.max(0, (state.quantities[id] || 0) + amount);
    },
    // Add a new action to clear all placed furniture
    clearPlacedFurniture: (state) => {
      state.placedFurniture = [];
      // Reset all quantities to 0
      Object.keys(state.quantities).forEach((key) => {
        state.quantities[key] = 0;
      });
    },
  },
});

// Actions
export const {
  setFurnitureItems,
  setIsLoading,
  selectFurniture,
  placeFurniture,
  updateFurniturePosition,
  removePlacedFurniture,
  updateQuantity,
  clearPlacedFurniture,
} = furnitureSlice.actions;

// Thunks
export const loadFurnitureItems = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const response = await fetch("http://localhost:5050/api/products");
    const data = await response.json();
    dispatch(setFurnitureItems(data));
  } catch (error) {
    console.error("Failed to load furniture items:", error);
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const saveDesign = (designName) => (dispatch, getState) => {
  const { placedFurniture, quantities } = getState().furniture;

  const design = {
    id: Date.now(),
    name: designName,
    furniture: placedFurniture,
    quantities: quantities,
    createdAt: new Date().toISOString(),
  };

  // Get existing designs from localStorage
  const savedDesigns = JSON.parse(localStorage.getItem("roomDesigns") || "[]");
  savedDesigns.push(design);

  // Save updated designs back to localStorage
  localStorage.setItem("roomDesigns", JSON.stringify(savedDesigns));

  return design;
};

// Selectors
export const selectFurnitureItems = (state) => state.furniture.furnitureItems;
export const selectSelectedFurniture = (state) =>
  state.furniture.selectedFurniture;
export const selectPlacedFurniture = (state) => state.furniture.placedFurniture;
export const selectIsLoading = (state) => state.furniture.isLoading;
export const selectQuantities = (state) => state.furniture.quantities;

export default furnitureSlice.reducer;
