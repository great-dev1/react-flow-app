import { useState } from "react";
import axios from "./axios";

const SaveSidebar = ({name, description, onSave}) => {
    const [ipName, setIPName] = useState(name);
    const [ipDescription, setIPDescription] = useState(description ? description : "");
    return <div className="fixed h-screen w-80 right-1 bg-gray-300 z-10 border border-black p-3 flex flex-col justify-between">
        <div className="h-4/5">
            <div className="border-0 border-b border-black mb-5">
                Save Investigation Process
            </div>
            <div className="h-full">
                <div className="flex justify-between mb-3">
                    <label htmlFor="iprocess_name" className="w-1/3">Name:</label>
                    <input type="text" id="iprocess_name" className="w-2/3 border-black border text-sm" value={ipName} onChange={e => setIPName(e.target.value)} />
                </div>
                <div className="flex justify-between">
                    <label htmlFor="iprocess_description" className="w-1/3">Description:</label>
                    <textarea name="" id="iprocess_description" className="w-2/3 border border-black" cols="30" rows="5" value={ipDescription} onChange={e => setIPDescription(e.target.value)}></textarea>
                </div>
            </div>
        </div>
        <div className="text-right px-3">
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={() => onSave(ipName, ipDescription)}>Save</button>
        </div>
    </div>
}

export default SaveSidebar;