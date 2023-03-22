import axios from "axios";
import { serverUrl, token } from "./config";

const instance = axios.create({
    baseURL: serverUrl,
    timeout: 5000,
    headers: {
        authorization: `Bearer ${token}`
    }
})

export default instance;