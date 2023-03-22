import React, { useState } from "react";

export default ({ viewAll, clear, onSave, onLoad }) => {

    const [toggle, setToggle] = useState({ toolbar: true, actions: true });
    
    const { toolbar, actions } = toggle;

    const onDragStart = nodeType => event => {
        event.stopPropagation();
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
        if (nodeType == "toolbox") {
            event.dataTransfer.setData("tbX", event.clientX);
            event.dataTransfer.setData("tbY", event.clientY);
        }
    };

    const Test = ({onDragStart, draggable}) => {
        return <div title="Test" className="relative border-test border-2 rounded w-20 h-8 bg-black bg-opacity-10 transititext-primary text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600" onDragStart={onDragStart} draggable={draggable}>
            <div className="handle-yellow react-flow__handle react-flow__handle-left !h-4 !w-2 !rounded-none !border !border-gray-800"></div>
            <div className="react-flow__handle react-flow__handle-right handle-red !w-2 !h-4 !rounded-none !border !border-gray-800"></div>
            <div className="react-flow__handle react-flow__handle-bottom handle-green !w-4 !h-2 !rounded-none !border !border-gray-800"></div>
        </div>
    }
    const Entity = ({onDragStart, draggable}) => {
        return <div title="Entity" className="border-entity border-dotted border-2 p-3" onDragStart={onDragStart} draggable={draggable}>
            </div>
    }
    const Cause = ({onDragStart, draggable}) => {
        return <div title="Cause" className="border-cause h-8 w-8 border-2 rounded-full bg-black bg-opacity-10" onDragStart={onDragStart} draggable={draggable}></div>
    }
    const Event = ({onDragStart, draggable}) => {
        return <div title="Event" className="border-event h-8 w-8 border-2 rounded-full bg-black bg-opacity-10" onDragStart={onDragStart} draggable={draggable}></div>
    }
    return (
        <div className="flex flex-col border-4 bg-white border-black w-52 absolute top-28 left-28 z-10" id="toolbox" draggable onDragStart={onDragStart("toolbox")}>
            <div className="flex flex-col">
                <div className="px-1 bg-gray-400 border-0 border-b-4 border-black" onClick={() => setToggle({ ...toggle, toolbar: !toolbar })}>
                    {toolbar ? <i className="fa-solid fa-angle-up mr-4"></i> : <i className="fa-solid fa-angle-down mr-4"></i>}<span>Toolbox</span>
                </div>
                {toolbar &&
                    <div className="flex flex-col p-2">
                        <div className="flex justify-between p-1 mb-2">
                            <Event onDragStart={onDragStart("event")} draggable />
                            <Cause onDragStart={onDragStart("cause")} draggable />
                            <Test onDragStart={onDragStart("test")} draggable />
                        </div>
                        <Entity onDragStart={onDragStart("entity")} draggable />
                    </div>
                }
            </div>
            <div className="flex flex-col">
                <div className="px-1 bg-gray-400 border-4 border-x-0 border-black" onClick={() => setToggle({ ...toggle, actions: !actions })}>
                    {actions ? <i className="fa-solid fa-angle-up mr-4"></i> : <i className="fa-solid fa-angle-down mr-4"></i>}<span>Actions</span>
                </div>
                {actions &&
                    <div className="flex justify-between p-3">
                        <div className="flex">
                            <div title="Clear" className="text-white bg-gray-600 border-1 border-blue-700 rounded px-2 mr-2" onClick={() => clear()}><i className="fa-solid fa-xmark"></i></div>
                            <div title="View All" className="text-white bg-gray-600 border-1 border-blue-700 rounded px-2" onClick={() => viewAll()}><i className="fa-solid fa-display"></i></div>
                        </div>
                        <div className="flex">
                            <div title="Load" className="text-white bg-gray-600 border-1 border-blue-700 rounded px-2 mr-2" onClick={() => onLoad()}><i className="fa-solid fa-folder-open"></i></div>
                            <div title="Save" className="text-white bg-gray-600 border-1 border-blue-700 rounded px-2" onClick={() => onSave()}><i className="fa-solid fa-download"></i></div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};
