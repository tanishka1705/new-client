import express from 'express'
import CONNECT from './DB/connect'
const app = express()

require('dotenv').config()

const cors = require('cors')
import companyRouter from './routes/company-routes'
const projectRouter = require('./routes/projects-router').default

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

// company-routers
app.use('/api/v1/companies', companyRouter)

// project-routers
app.use('/api/v1/projects', projectRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`)
    CONNECT()
})