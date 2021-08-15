import { Router } from "express"
import contactHandlers from './handlers.js'
import multer from 'multer'

const contactsService = Router()
const upload = multer()

contactsService.get('/', contactHandlers.list)

contactsService.post('/', contactHandlers.create)

contactsService.put('/:id', contactHandlers.update)

contactsService.put('/:id/avatar', upload.single("avatar"), contactHandlers.updateAvatar)

contactsService.delete('/:id', contactHandlers.delete)

export default contactsService