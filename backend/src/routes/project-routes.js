import { Router } from 'express'
const projectRouter = Router()

import { createProject, deleteProjectByID, getAllListedProjects, getProjectByID, updateProjectByID } from '../controllers/project-controllers'

projectRouter.post('/', createProject)
projectRouter.get('/', getAllListedProjects)
projectRouter.get('/:id', getProjectByID)
projectRouter.patch('/:id', updateProjectByID)
projectRouter.delete('/:id', deleteProjectByID)

export default projectRouter