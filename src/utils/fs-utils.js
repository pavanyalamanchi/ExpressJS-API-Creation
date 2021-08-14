import { fileURLToPath } from 'url'
import { dirname, join, extname } from 'path'
import fs from 'fs-extra'
import uniqid from "uniqid"

const contactsJSONPath = join(dirname(fileURLToPath(
    import.meta.url)), '../data/contacts.json')

const publicFolderPath = join(dirname(fileURLToPath(
    import.meta.url)), '../../public')


export const readContact = async() => {
    try {
        const result = await fs.readJSON(contactsJSONPath)
        return result;
    } catch (error) {
        throw error;
    }
}

export const writeContact = async(content) => {
    try {
        const contacts = await readContact()
        console.log('hey i am error', contacts)
        const newContact = { contacts: [], ...content, id: uniqid(), createdAt: new Date().toISOString() }
        contacts.push(newContact)
        await fs.writeJSONSync(contactsJSONPath, contacts)
        return newContact
    } catch (error) {
        throw error;
    }
}

export const deleteContact = async(id) => {
    let contacts = await readContact()
    contacts = contacts.filter(contact => contact.id !== id)
    await writeContact(contacts)
}

export const updateContact = async(id, contactToUpdate) => {
    let contacts = await readContact()
    let contactIndex = contacts.findIndex(contact => contact.id === id)
    if (contactIndex != -1) {
        let contact = contacts[contactIndex]
        contact = {
            id,
            ...contact,
            ...contactToUpdate,
            updatedAt: new Date().toISOString()
        }
        contacts[contactIndex] = contact
    } else {
        throw new Error(`Contact with id ${id} is not found`)
    }
}

export const updateContactAvatar = async(id, file) => {
    const extension = extname(file.originalname)
    const fileName = `${id}${extension}`
    await fs.writeFile(publicFolderPath, file.buffer)
    const avatar = `http://localhost:${process.env.PORT}/${fileName}`
    await fs.updateContact(id, { avatar: avatar })
}

const contact = {
    new: writeContact,
    read: readContact,
    delete: deleteContact,
    update: updateContact,
    updateAvatar: updateContactAvatar
}

export default contact