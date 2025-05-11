import React from "react";
import Header from "./components/Header";
import FurnitureCatalog from "./components/FurnitureCatalog";
import PlacementCanvas from "./components/PlacementCanvas";
import { FurnitureProvider } from "./context/FurnitureContext";
import "./App.css";

function App() {
  return (
    <FurnitureProvider>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <FurnitureCatalog />
          <PlacementCanvas />
        </div>
      </div>
    </FurnitureProvider>
  );
}

export default App;
