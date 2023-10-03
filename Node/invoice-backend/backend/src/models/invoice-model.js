import { Schema, model, SchemaType } from 'mongoose'

const schema = Schema({
    company_name: { type: String, required: true },
    date: { type: Date, required: true },
    invoice: [{
        id: { type: Number, required: true, unique: true },
        description: { type: String, required: true },
        period: { type: Date, required: true },
        rate: { type: Number, required: true },
        conversionRate: { type: Number, required: true },
        amount: { type: Number, required: true },
    }],
    subtotal: { type: Number, required: true },
    gst: { type: Object || Number, required: true },
    total: { type: Number, required: true }
})

const invoiceDetail = model('invoiceDetail', schema)

export default invoiceDetail