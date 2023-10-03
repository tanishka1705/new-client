import express from 'express'
const app = express()
import Connect from './DB/connect'

import { config } from 'dotenv'
config()

import { AppError, companyRouter, globalErrorHandler, invoiceRouter, projectRouter } from './utils/import'

import cors from 'cors'
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// company-routers
app.use('/api/v1/companies', companyRouter)

// project-routers
app.use('/api/v1/projects', projectRouter)

// invoice-history-routers
app.use('/api/v1/invoice', invoiceRouter)

// for all routes
app.all('*', (req, _, next) => {
    next(new AppError(`can'nt find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
    Connect()
})