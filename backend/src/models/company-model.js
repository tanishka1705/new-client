import mongoose, { Schema, model } from 'mongoose'

const schema = Schema({
    name: { type: String, required: true, unique: true },
    gstin: { type: String, required: true, unique: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pin: { type: String, required: true },
        country: { type: String, required: true }
    },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'projectDetail' }]
})

const companyDetails = model('companyDetail', schema)

export default companyDetails