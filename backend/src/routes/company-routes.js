import { Router } from 'express'
const companyRouter = Router()

import { createCompany, deleteCompanyByID, getAllListedCompanies, getCompanyByID, getProjectsOfCompany, updateCompanyByID } from '../controllers/company-controllers'

companyRouter.post('/', createCompany)
companyRouter.get('/', getAllListedCompanies)
companyRouter.get('/:id', getCompanyByID)
companyRouter.get('/project/:id', getProjectsOfCompany)
companyRouter.patch('/:id', updateCompanyByID)
companyRouter.delete('/:id', deleteCompanyByID)

export default companyRouter