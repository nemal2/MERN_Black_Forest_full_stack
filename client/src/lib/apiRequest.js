import axios from "axios";

const apiRequest = axios.create({
    baseURL:"https://blackapi.vercel.app/api",
    //http://localhost:8800/api
    withCredentials : true,
})

export default apiRequest;