import companyDetails from "../models/company-model"
import AppError from "../utils/appError"
import catchAsync from "../utils/catchAsync"

const createCompany = catchAsync(async (req, res) => {
    const { name, gstin, address } = req.body

    const newCompany = await companyDetails({ name, gstin, address: { street: address.street, city: address.city, state: address.state, pin: address.pin, country: address.country } })
    const result = await newCompany.save()

    res.status(201).json({ status: 'true', message: `Company registered successfully!`, new: result })
})

const getAllListedCompanies = catchAsync(async (_, res, next) => {
    const getAll = await companyDetails.find({})

    if (getAll.length === 0) return next(new AppError(`There are no listed companies!`, 404))

    res.status(200).json({ status: 'true', allListedCompanies: getAll })
})

const getProjectsOfCompany = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const companyDetail = await companyDetails.findById({ _id: id }).populate('projects')

    if (!companyDetail) return next(new AppError('Not Found!, Please check company_id', 404))

    res.status(201).json({ status: 'true', projects: companyDetail.projects })
})

const getCompanyByID = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const searchResult = await companyDetails.findById({ _id: id })

    if (!searchResult) return next(new AppError('Not Found!, Please check company_id', 404))

    res.status(200).json({ status: 'true', companyDetail: searchResult })
})

const updateCompanyByID = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const updateData = req.body

    const prevDocument = await companyDetails.findById({ _id: id })

    if (!prevDocument) return next(new AppError('Not Found! Please check company_id', 404))

    const fieldsToUpdate = { name: prevDocument.name, gstin: prevDocument.gstin, address: prevDocument.address }

    for (const key in updateData) {
        if (key === 'address' && typeof updateData.address === 'object') {
            for (const addressKey in updateData.address) {
                fieldsToUpdate[key][addressKey] = updateData.address[addressKey];
            }
        } else {
            fieldsToUpdate[key] = updateData[key];
        }
    }

    const updateResult = await companyDetails.findByIdAndUpdate({ _id: id }, { $set: fieldsToUpdate }, { new: true })
    res.status(200).json({ status: 'true', updatedCompany: updateResult })
})

const deleteCompanyByID = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const company = await companyDetails.findByIdAndDelete({ _id: id })

    if (!company) return next(new AppError('Not Found! Please check company_id', 404))

    res.status(200).json({ status: 'true', message: 'Deleted successfully!' })
})


export { getAllListedCompanies, createCompany, getCompanyByID, updateCompanyByID, deleteCompanyByID, getProjectsOfCompany }