import projectDetails from "../models/project-model"
import companyDetails from '../models/company-model'
import AppError from "../utils/appError"
import catchAsync from "../utils/catchAsync"

const createProject = catchAsync(async (req, res) => {
    const { description, rate, totalHours, conversionRate, companyId } = req.body

    // find company by it's id
    const company = await companyDetails.findById({ _id: companyId })

    // create new project
    const newProject = await projectDetails({ description, rate, totalHours, conversionRate, company: company.name })
    const result = await newProject.save()

    // update companydetails collection
    company.projects.push(result._id)
    await company.save()

    res.status(201).json({ success: 'true', message: 'project created successfully!', newProject: result })
})

const getAllListedProjects = catchAsync(async (req, res) => {
    const allListedProjects = await projectDetails.find({})

    res.status(200).json({ success: 'true', allListedProjects })
})

const getProjectByID = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const project = await projectDetails.findById({ _id: id })

    if (!project) return next(new AppError('Not Found! Please check project_id', 404))

    res.status(200).json({ success: 'true', project })
})

const updateProjectByID = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const updatedData = req.body

    const updatedProject = await projectDetails.findByIdAndUpdate({ _id: id }, { $set: { ...updatedData } }, { new: true })

    if (!updatedProject) return next(new AppError('Not Found! Please check project_id', 404))

    res.status(200).json({ success: 'true', updatedProject })
})

const deleteProjectByID = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const project = await projectDetails.findByIdAndDelete({ _id: id })
    console.log(project);

    if (!project) return next(new AppError('Not Found! Please check project_id', 404))

    res.status(200).json({ success: 'true', message: 'Project deleted successfully!' })
})

export { createProject, getAllListedProjects, getProjectByID, updateProjectByID, deleteProjectByID }