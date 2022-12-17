import axios from 'axios'

const getContacts = () => {
    const request = axios.get( 'http://localhost:3001/persons' )

    return request
        .then( response => response.data )
}

const addContact = ( name, number ) => {
    const newContact = {
        name,
        number 
    }

    const request = axios.post( 'http://localhost:3001/persons', newContact )

    return request
        .then( response => response.data )
}

const deleteContact = ( id ) => {
    const request = axios.delete( `http://localhost:3001/persons/${id}`)

    return request
        .then( response => response.data )
    }

const editContact = ( id, name, number ) => {
    const editedContact = {
        name,
        number 
    }

    const request = axios.put( `http://localhost:3001/persons/${id}`, editedContact )

    return request 
        .then( response => response.data )
}

export default { getContacts, addContact, deleteContact, editContact }