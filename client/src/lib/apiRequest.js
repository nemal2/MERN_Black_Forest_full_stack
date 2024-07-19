import axios from "axios";

const apiRequest = axios.create({
    baseURL:"https://mern-black-forest-full-stack.onrender.com/api",
    //http://localhost:8800/api
    
    withCredentials : true,
})

export default apiRequest;