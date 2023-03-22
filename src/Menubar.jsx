import React from "react";

export default ({ viewAll, clear, save, load }) => {
  return (
    <div className="w-screen flex justify-center fixed left-0 top-3 z-10">
      <button
        className="px-4 py-1 text-base rounded text-white bg-neutral-700 mx-1 hover:shadow-md hover:shadow-gray-700"
        onClick={() => viewAll()}
      >
        View All
      </button>
      <button
        className="px-4 py-1 text-base rounded text-white bg-neutral-700 mx-1 hover:shadow-md hover:shadow-gray-700"
        onClick={() => clear()}
      >
        Clear
      </button>
      <button
        className="px-4 py-1 text-base rounded text-white bg-neutral-700 mx-1 hover:shadow-md hover:shadow-gray-700"
        onClick={() => save()}
      >
        Save
      </button>
      {/* <input type="file" id="file-selector" accept=".jpg, .jpeg, .png"></input> */}
      <input type="file" id="load-btn" accept=".json" onChange={load} hidden />
      <label
        htmlFor="load-btn"
        className="px-4 py-1 text-base rounded text-white bg-neutral-700 mx-1 hover:shadow-md hover:shadow-gray-700"
      >
        Load
      </label>
    </div>
  );
};
