import { useEffect, useState } from "react";
import axios from "./axios";

const LoadSidebar = ({data, onLoad}) => {
    const [iprocess, setIprocess] = useState(data.length > 0 ? data[0].uuid : "");

    useEffect(() => {
        setIprocess(data.length > 0 ? data[0].uuid : "");
    }, [data]);

    const onLoadClk = async () => {
        const { data } = await axios.get(`/api/iprocess/?uuid=${iprocess}`);
        onLoad(data);
    }
    return <div className="fixed h-screen w-80 right-1 bg-gray-300 z-10 border border-black p-3 flex flex-col justify-between">
        <div className="h-4/5">
            <div className="border-0 border-b border-black mb-5">
                Investigation Process List
            </div>
            <div className="h-full">
                <label htmlFor="iprocesses" className="block mb-2 text-sm font-medium text-black">Select an investigation process</label>
                <div className="h-4/5 overflow-y-auto">
                    <select id="iprocesses" value={iprocess} onChange={(e) => setIprocess(e.target.value)} size={data.length} className="bg-gray-50 text-black text-sm block w-full p-2.5 dark:placeholder-gray-500 dark:text-black overflow-hidden">
                        {data.map((e, i) => <option value={e.uuid} key={e.uuid}>{e.name}</option>)}
                    </select>
                </div>
            </div>
        </div>
        <div className="text-right px-3">
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={onLoadClk}>Load</button>
        </div>
    </div>
}

export default LoadSidebar;