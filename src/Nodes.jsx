import React from "react";
import { Handle } from "react-flow-renderer";

const RectangleNode = ({ data, id }) => {
  return (
    <div className="border-test h-8 w-20 border-2 rounded bg-black bg-opacity-10" onClick={data.onClickNode}>
      <div
        className="absolute -top-1 -right-1 bg-gray-600 rounded-full w-2 h-2 flex justify-center cursor-pointer"
        onClick={(e) => {
          data?.deleteNode(id);
        }}
      >
        <p className="close">X</p>
      </div>
      <div className="text-center">{data.content}</div>
      <Handle type="target" position="top" id={`${id}.top`} className="!opacity-0 !top-0 !w-16 !h-2 !rounded-none" />
      <Handle
        type="source"
        position="left"
        id={`${id}.left`}
        className="handle-yellow !w-2 !h-4 !rounded-none !border !border-gray-800"
      />
      <Handle
        type="source"
        position="right"
        id={`${id}.right`}
        className="handle-red !w-2 !h-4 !rounded-none !border !border-gray-800"
      />
      <Handle
        type="source"
        position="bottom"
        id={`${id}.bottom`}
        className="handle-green !w-4 !h-2 !rounded-none !border !border-gray-800"
      />
    </div>
  );
};

const CircleNode1 = ({ data, id }) => {
  return (
    // <div className="flex flex-col items-center" onClick={data.onClickNode}>
    <div
      className="relative border-event h-8 w-8 border-2 rounded-full bg-black bg-opacity-10"
      onClick={data.onClickNode}
    >
      <div className="-mt-7 text-center flex justify-center">
        <span>{data.content}</span>
      </div>
      <div
        className="absolute top-0 -right-0.5 bg-gray-600 rounded-full w-2 h-2 flex justify-center cursor-pointer"
        onClick={(e) => {
          data?.deleteNode(id);
        }}
      >
        <p className="close">X</p>
      </div>
      <Handle
        type="source"
        position="bottom"
        id={`${id}.left`}
        className="handle-yellow !w-2 !h-2 !border !border-gray-800"
      />
    </div>
    // </div>
  );
};

const CircleNode2 = ({ data, id }) => {
  return (
    <div
      className="relative border-cause h-8 w-8 border-2 rounded-full bg-black bg-opacity-10"
      onClick={data.onClickNode}
    >
      <div className="mt-7 text-center flex justify-center">
        <span>{data.content}</span>
      </div>
      <div
        className="absolute top-0 -right-0.5 bg-gray-600 rounded-full w-2 h-2 flex justify-center cursor-pointer"
        onClick={(e) => {
          data?.deleteNode(id);
        }}
      >
        <p className="close">X</p>
      </div>
      <Handle
        type="target"
        position="top"
        id={`${id}.left`}
        className="handle-green !w-2 !h-2 !border !border-gray-800"
      />
    </div>
  );
};

const DottedRectangleNode = ({ data, id }) => {
  return (
    <div onClick={data.onClickNode}>
      <div>{data.content}</div>
      <div className="relative border-entity h-80 w-64 border-2 border-dotted">
        <div
          className="absolute -top-1 -right-1 bg-gray-600 rounded-full w-2 h-2 flex justify-center cursor-pointer"
          onClick={(e) => {
            data?.deleteNode(id);
          }}
        >
          <p className="close">X</p>
        </div>
        <Handle
          type="source"
          position="top"
          id={`${id}.top`}
          className="!bg-white !w-4 !h-2 !rounded-none !border !border-gray-800"
        />
        <Handle
          type="target"
          position="bottom"
          id={`${id}.bottom`}
          className="!bg-white !w-4 !h-2 !rounded-none !border !border-gray-800"
        />
      </div>
    </div>
  );
};

export const nodeTypes = {
  circle1: CircleNode1,
  circle2: CircleNode2,
  rectangle: RectangleNode,
  dottedrectangle: DottedRectangleNode,
};
