import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    name: String,
    age: Number,
    count:Number,
},
    { timestamps: true },
);

export const dataModel = mongoose.model('Data', dataSchema);