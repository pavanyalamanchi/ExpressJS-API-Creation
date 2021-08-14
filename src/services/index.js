import { Router } from 'express'
import contactsService from "./contacts/route.js"

const services = Router()
services.use("/contacts", contactsService)


export default services