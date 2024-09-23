// axiosInstance.js
import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8082/api/v1/employees',  // Replace with your API's base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token in every request
axiosInstance.interceptors.request.use(
    (config) => {
        // Get the token from localStorage (or any other storage method you use)
        const token = localStorage.getItem('token');

        // If the token exists, add it to the headers
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Handle any request errors here
        console.log("error at interceptor - ", error);
        return Promise.reject(error);
    }
);

// Optionally, add a response interceptor for handling errors globally
axiosInstance.interceptors.response.use(
    (response) => {
        // Any status code that falls within the range of 2xx will trigger this function
        return response;
    },
    (error) => {
        // Handle errors globally (e.g., redirect to login if 401 Unauthorized)
        if (error.response.status === 401) {
            console.log('Unauthorized, logging out...');
            // You can log out the user, clear the token, and redirect to login
            // localStorage.removeItem('token');
            // window.location.href = '/login';  // Or use a programmatic navigation method
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
