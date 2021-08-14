import contact from '../../utils/fs-utils.js'

export const listContacts = async(req, res, next) => {
    try {
        const contactsList = await contact.read()
        res.send(contactsList)
    } catch (error) {
        res.status(500).send({ error: error.message })
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

const contactHandlers = {
    list: listContacts,
    create: createContact
}

export default contactHandlers