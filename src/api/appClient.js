import axios from "axios";

const appClient = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000,
    headers: {
        "Content-Type": 'application/json',
    },
});

appClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken"); 
        
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default appClient;