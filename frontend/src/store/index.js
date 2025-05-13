import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import furnitureReducer from "./slices/furnitureSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    furniture: furnitureReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
