const express = require('express')
const { getAllListedCompanies, createCompany, getCompanyByID, updateCompanyByID, deleteCompanyByID } = require('../controllers/company-controllers').default
const companyRouter = express.Router()

companyRouter.post('/create', createCompany)
companyRouter.get('/', getAllListedCompanies)
companyRouter.get('/:id', getCompanyByID)
companyRouter.patch('/:id', updateCompanyByID)
companyRouter.delete('/:id', deleteCompanyByID)

module.exports = companyRouter