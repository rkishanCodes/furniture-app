import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  furnitureItems: [],
  selectedFurniture: null,
  placedFurniture: [],
  isLoading: true,
};


export const furnitureSlice = createSlice({
  name: "furniture",
  initialState,
  reducers: {
    setFurnitureItems: (state, action) => {
      state.furnitureItems = action.payload;
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
      state.placedFurniture = state.placedFurniture.filter(
        (item) => item.id !== action.payload
      );
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
  const { placedFurniture } = getState().furniture;

  const design = {
    id: Date.now(),
    name: designName,
    furniture: placedFurniture,
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

export default furnitureSlice.reducer;
