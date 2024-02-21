import mongoose from 'mongoose';

async function connect() {
    try {
        mongoose.set('strictQuery', true);
        const db = await mongoose.connect('mongodb://localhost:27017/dataNeuron');
        console.log("Database Connected");
        return db;
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw error;
    }
}

export default connect;