import catchAsync from "../utils/catchAsync";

const createInvoice = catchAsync(async (req, res, next) => {
    const { company_name, date } = req.body
})
const getAllInvoice = catchAsync(async (req, res, next) => { })
const getInvoiceById = catchAsync(async (req, res, next) => { })

export { createInvoice, getAllInvoice, getInvoiceById }