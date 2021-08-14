import { Router } from "express"
import contactHandlers from './handlers.js'

const contactsService = Router()

contactsService.get('/', contactHandlers.list)

contactsService.post('/', contactHandlers.create)

export default contactsService