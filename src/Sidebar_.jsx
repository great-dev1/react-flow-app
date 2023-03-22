import React from "react";
import { Background } from "react-flow-renderer";

export default ({ toggleMode }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="px-2 pb-4 pt-20 flex flex-col justify-between bg-neutral-400 w-28 border-r-gray-700 border-r shadow-lg shadow-gray-700 z-20">
      <div>
        <div
          className="entity-btn border p-0.5 rounded mb-3 flex justify-center text-center cursor-pointer hover:shadow-md hover:shadow-gray-700"
          onDragStart={(event) => onDragStart(event, "entity")}
          draggable
        >
          <p className="text-white text-xl">Entity</p>
        </div>
        <div
          className="event-btn border p-0.5 rounded mb-3 flex justify-center text-center cursor-pointer hover:shadow-md hover:shadow-gray-700"
          onDragStart={(event) => onDragStart(event, "event")}
          draggable
        >
          <p className="text-white text-xl">Event</p>
        </div>
        <div
          className="test-btn border p-0.5 rounded mb-3 flex justify-center text-center cursor-pointer hover:shadow-md hover:shadow-gray-700"
          onDragStart={(event) => onDragStart(event, "test")}
          draggable
        >
          <p className="text-white text-xl">Test</p>
        </div>
        <div
          className="cause-btn border p-0.5 rounded mb-3 flex justify-center text-center cursor-pointer hover:shadow-md hover:shadow-gray-700"
          onDragStart={(event) => onDragStart(event, "cause")}
          draggable
        >
          <p className="text-white text-xl">Cause</p>
        </div>
      </div>
      {/* <button
        className="switchMode rounded cursor-pointer p-0.5 bg-white hover:shadow-md hover:shadow-gray-700"
        onClick={toggleMode}
      >
        Switch
      </button> */}
    </div>
  );
};
