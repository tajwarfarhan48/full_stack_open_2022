import axios from 'axios'

const baseUrl = '/api/persons'

const getContacts = () => {
    const request = axios.get( baseUrl )

    return request
        .then( response => response.data )
}

const addContact = ( name, number ) => {
    const newContact = {
        name,
        number 
    }

    const request = axios.post( baseUrl, newContact )

    return request
        .then( response => response.data )
}

const deleteContact = ( id ) => {
    const request = axios.delete( `${baseUrl}/${id}`)

    return request
        .then( response => response.data )
    }

const editContact = ( id, name, number ) => {
    const editedContact = {
        name,
        number 
    }

    const request = axios.put( `${baseUrl}/${id}`, editedContact )

    return request 
        .then( response => { return response.data } )
}

export default { getContacts, addContact, deleteContact, editContact }