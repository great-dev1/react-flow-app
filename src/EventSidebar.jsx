import { useEffect, useState } from "react";
import axios from "./axios";

const EventSidebar = ({node, closeSidebar}) => {
    const [eName, setEName] = useState(node ? node.data.content : "");
    const [eDescription, setEDescription] = useState(node ? node.data.description : "");
    useEffect(() => {
        setEName(node ? node.data.content : "");
        setEDescription(node ? node.data.description : "");
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
                        <input type="text" id="event_name" className="w-2/3 border-black border text-sm" value={eName} onChange={e => setEName(e.target.value)} />
                    </div>
                    <div className="flex justify-between">
                        <label htmlFor="iprocess_description" className="w-1/3">Description:</label>
                        <textarea name="" id="iprocess_description" className="w-2/3 border border-black" cols="30" rows="5" value={eDescription} onChange={e => setEDescription(e.target.value)}></textarea>
                    </div>
                </div>
            </div>
            <div className="text-right px-3">
            </div>
        </div>
    </div>
}

export default EventSidebar;