// Import necessary modules
import { createCustomError } from "../middleware/errorHandler.js";
import { dataModel } from "../models/dataModel.js";

// Initialize a counter for add and update operations
let addUpdateCount = 0;

// Controller function to get data from the database
export const getData = async (req, res, next) => {
    try {
        // Fetch data from the database
        const data = await dataModel.find();

        // Respond with the fetched data and the addUpdateCount
        return res.status(200).json({ success: true, data, addUpdateCount });
    } catch (error) {
        // Pass the error to the next middleware
        next(error);
    }
};

// Controller function to add new data to the database
export const addData = async (req, res, next) => {
    try {
        // Handle request body to get data
        const newData = req.body;

        // Validate required fields in the request body
        if (!newData || !newData.name || !newData.age) {
            throw createCustomError('Required fields are missing', 400);
        }

        // Add data to the database
        await dataModel.create(newData);

        // Increment the addUpdateCount and respond with success message
        addUpdateCount++;
        return res.status(200).json({ success: true, newData, addUpdateCount });
    } catch (error) {
        // Pass the error to the next middleware
        next(error);
    }
};

// Controller function to update existing data in the database
export const updateData = async (req, res, next) => {
    try {
        // Handle request body to get data
        const { id, name, age } = req.body;

        // Validate required fields in the request body
        if (!id || !name || !age) {
            throw createCustomError('Required fields are missing', 400);
        }

        // Check if the data with the given ID exists
        const existingData = await dataModel.findById(id);
        if (!existingData) {
            throw createCustomError('Data not found', 404);
        }

        // Prepare the updated data
        const updatedData = {
            name,
            age,
        };

        // Update data in the database
        await dataModel.findByIdAndUpdate(id, updatedData);

        // Increment the addUpdateCount and respond with success message
        addUpdateCount++;
        return res.status(200).json({ success: true, updatedData, addUpdateCount });
    } catch (error) {
        // Pass the error to the next middleware
        next(error);
    }
};