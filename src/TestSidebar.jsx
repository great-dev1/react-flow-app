import { useState, useEffect } from "react";
import axios from "./axios";

const TestSidebar = ({node, closeSidebar}) => {
    const [tName, setTName] = useState(node ? node.data.content : "");
    const [tDescription, setTDescription] = useState(node ? node.data.description : "");

    useEffect(() => {
        setTName(node ? node.data.content : "");
        setTDescription(node ? node.data.description : "");
    }, [node])

    return <div className="w-screen h-screen absolute z-20" onClick={closeSidebar}>
        <div className="fixed h-screen w-80 right-1 bg-gray-300 z-10 border border-black p-3 flex flex-col justify-between">
            <div className="h-4/5">
                <div className="border-0 border-b border-black mb-5">
                    Event Object
                </div>
                <div className="h-full">
                    <div className="flex justify-between mb-3">
                        <label htmlFor="event_name" className="w-1/3">Name:</label>
                        <input type="text" id="event_name" className="w-2/3 border-black border text-sm" value={tName} onChange={e => setTName(e.target.value)} />
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="iprocess_description" className="w-1/3">Description:</label>
                        <textarea name="" id="iprocess_description" className="w-2/3 border border-black" cols="30" rows="5" value={tDescription} onChange={e => setTDescription(e.target.value)}></textarea>
                    </div>
                </div>
            </div>
            <div className="text-right px-3">
            </div>
        </div>
    </div>
}

export default TestSidebar;