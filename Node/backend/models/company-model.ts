const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: { type: String, required: true },
    GSTIN: { type: String, required: true },
    Address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pin: { type: String, required: true },
        country: { type: String, required: true }
    },
    Projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'projects' }]
})

const companyDetails = mongoose.model('companyDetail', schema)

module.exports = companyDetails