import React from "react";
import FurnitureCatalog from "../../components/FurnitureCatalog";
import PlacementCanvas from "../../components/PlacementCanvas";
// import DesignSwitcher from "../../components/DesignSwitcher";

const BuyFurniture = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Furniture Room Planner</h1>
          <p className="mt-2">Design your room with ease</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md">
            <FurnitureCatalog />
            {/* <DesignSwitcher /> */}
          </div>
          <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-md p-6">
            <PlacementCanvas />
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Furniture Room Planner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BuyFurniture;
