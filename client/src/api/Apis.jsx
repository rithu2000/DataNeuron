// Importing the dataApi instance from the "../utils/axios" module
import { dataApi } from "../utils/axios";

// Function to fetch data from the API
export const getData = async () => {
    try {
        // Making a GET request to the root endpoint with credentials
        const { data } = await dataApi.get(`/`, { withCredentials: true })
        return data;
    } catch (error) {
        // Logging and returning an error message in case of failure
        console.error(error);
        return { error: 'Data retrieval API error' }
    }
};

// Function to add data using a POST request
export const addData = async (formData) => {
    try {
        // Making a POST request to the "/add" endpoint with form data and credentials
        const { data } = await dataApi.post(`/add`, formData, { withCredentials: true });
        
        // Logging the response data
        console.log(data, 'response data');
        
        return data;
    } catch (error) {
        // Logging and returning an error message in case of failure
        console.error(error);
        return { error: 'Data addition API error' }
    }
};

// Function to update data using a POST request
export const updateData = async (formData) => {
    try {
        // Making a POST request to the "/update" endpoint with form data and credentials
        const { data } = await dataApi.post(`/update`, formData, { withCredentials: true })
        return data;
    } catch (error) {
        // Logging and returning an error message in case of failure
        console.error(error);
        return { error: 'Data update API error' }
    }
};
