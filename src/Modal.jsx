import { useState, useEffect } from "react";

export default function Modal({
  setIsSelected,
  textRef,
  nodeName,
  setNodeName,
  description,
  setDescription,
  content,
  setContent,
  color,
  setColor,
}) {
  const [modalNodeType, setModalNodeType] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [modalColor, setModalColor] = useState("");
  const [modalDescription, setModalDescription] = useState("");

  useEffect(() => {
    setModalNodeType(nodeName);
    setModalContent(content);
    setModalColor(color);
    setModalDescription(description);
  }, [nodeName, content, color, description]);

  const closeModal = () => {
    setIsSelected(false);
  };

  const saveModal = () => {
    setIsSelected(false);
    setNodeName(modalNodeType);
    setContent(modalContent);
    setColor(modalColor);
    setDescription(modalDescription);
  };

  return (
    <div className="bg-white fixed top-14 right-14 w-72 text-neutral-700 border-2 border-neutral-700 z-50 shadow-md shadow-neutral-700">
      <div className="flex items-center justify-between py-1 px-3 border-b-2 border-neutral-700 text-white bg-gray-400">
        <span>{content}</span>
        <div className="w-5 h-5 rounded-full bg-gray-800 flex justify-center cursor-pointer" onClick={closeModal}>
          <p className="font-xs text-white -mt-0.5">X</p>
        </div>
      </div>
      <div className="p-2">
        <div className="flex justify-between items-center mt-4 mb-2">
          <label className="font-bold">Type:</label>
          <input
            className="w-40 border border-gray-600 px-1 py-0.5"
            type="text"
            disabled
            placeholder="type"
            value={modalNodeType}
            onChange={(evt) => setModalNodeType(evt.target.value)}
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <label className="font-bold">Content:</label>
          <input
            className="w-40 border border-gray-600 px-1 py-0.5"
            type="text"
            placeholder="content"
            value={modalContent}
            onChange={(evt) => setModalContent(evt.target.value)}
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <label className="font-bold">Color:</label>
          <input
            className="w-40 border border-gray-600 px-1 py-0.5"
            type="text"
            placeholder="color"
            value={modalColor}
            onChange={(evt) => setModalColor(evt.target.value)}
          />
        </div>
        <div className="flex flex-col items-start mb-8">
          <label className="-mb-3 z-10 bg-white px-1 ml-1 font-bold">Description</label>
          <textarea
            className="w-full pt-2 border border-gray-600 px-1 py-0.5"
            type="text"
            rows="3"
            placeholder="description"
            ref={textRef}
            value={modalDescription}
            onChange={(evt) => setModalDescription(evt.target.value)}
          />
        </div>
        <div className="flex justify-center my-3">
          <button
            className="bg-neutral-700 rounded hover:shadow-md hover:shadow-gray-700 text-white w-20 py-0.5 mr-6"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-neutral-700 rounded hover:shadow-md hover:shadow-gray-700 text-white w-20 py-0.5"
            onClick={saveModal}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
