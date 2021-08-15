import contact from '../../utils/fs-utils.js'
import createError from 'http-errors'

export const listContacts = async(req, res, next) => {
    try {
        const contactsList = await contact.read()
        res.send(contactsList)
    } catch (error) {
        //res.status(500).send({ error: error.message })
        next(createError(404, error.message))
    }
}

export const createContact = async(req, res, next) => {
    try {
        const newContact = await contact.new(req.body)
        res.status(201).send(newContact)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

export const updateContact = async(req, res, next) => {
    try {
        const newContact = await contact.update(req.params.id, req.body)
        res.status(200).send(newContact)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

export const deleteContact = async(req, res, next) => {
    try {
        await contact.delete(req.params.id)
        res.status(200).send({ message: 'successfully deleted!' })
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

export const updateContactAvatar = async(req, res, next) => {
    try {
        await contact.updateAvatar(req.params.id, req.file)
        res.status(204)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

const contactHandlers = {
    list: listContacts,
    create: createContact,
    update: updateContact,
    delete: deleteContact,
    updateAvatar: updateContactAvatar
}

export default contactHandlers