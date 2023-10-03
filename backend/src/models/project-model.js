import mongoose, { Schema, model } from "mongoose";

const schema = Schema({
    description: { type: String, required: true, trim: true },
    rate: { type: Number, required: true },
    totalHours: { type: Number, required: true },
    conversionRate: { type: Number, required: true },
    company: { type: String, required: true, trim: true }
})

const projectDetails = model('projectDetail', schema)
export default projectDetails