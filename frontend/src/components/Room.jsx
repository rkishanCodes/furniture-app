import React from "react";

const Room = ({ dimensions, backgroundImage }) => {
  return (
    <div
      className="relative bg-gray-100 border border-gray-400"
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Room walls and features can be added here */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gray-700"></div>
      <div className="absolute top-0 right-0 h-full w-2 bg-gray-700"></div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-700"></div>
      <div className="absolute top-0 left-0 h-full w-2 bg-gray-700"></div>
    </div>
  );
};

export default Room;
