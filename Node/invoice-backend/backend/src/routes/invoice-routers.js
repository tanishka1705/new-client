import { Router } from 'express'
const invoiceRouter = Router()

import { createInvoice, getAllInvoice, getInvoiceById } from '../controllers/invoice-controllers'

invoiceRouter.post('/', createInvoice)
invoiceRouter.get('/', getAllInvoice)
invoiceRouter.get('/:id', getInvoiceById)

export default invoiceRouter