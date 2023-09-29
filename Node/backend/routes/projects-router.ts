import { Router } from 'express'
import { createProject, getAllListedProjects, getProjectByID, updateProjectByID, deleteProjectByID } from '../controllers/project-controllers'
const projectRouter = Router()

projectRouter.post('/', createProject)
projectRouter.get('/', getAllListedProjects)
projectRouter.get('/:id', getProjectByID)
projectRouter.patch('/:id', updateProjectByID)
projectRouter.delete('/:id', deleteProjectByID)

export default projectRouter