import { useEffect, useState } from 'react'
import server from './server.js'

import FilterForm from './components/FilterForm'
import NewContactForm from './components/NewContactForm'
import Numbers from './components/Numbers'
import Message from './components/Message'

const App = () => {
  const [ persons, setPersons ] = useState( [] ) 
  const [ filterText, setFilterText ] = useState( '' )
  const [ newName, setNewName ] = useState( '' ) 
  const [ newPhone, setNewPhone ] = useState( '' )
  const [ message, setMessage ] = useState( null )
  const [ messageType, setMessageType ] = useState( 1 )

  const addName = e => {
    e.preventDefault()

    server
      .addContact( newName, newPhone )
      .then( newContact => {
        setPersons( persons.concat( newContact ) )
        setMessageType( 1 )
        setMessage( `Added ${newName}` )
        setTimeout(() => {
          setMessage( null )
        }, 3000)
        setNewName( '' )
        setNewPhone( '' )
        setFilterText( '' )
    } )
      .catch( err => { 
        setMessageType( 2 )
        if ( err.response.status === 400 ) {
          setMessage( err.response.data.error )
        }
        setTimeout( () => {
          setMessage( null )
        }, 3000 )
        setNewName( '' )
        setNewPhone( '' )
        setFilterText( '' )
       } )
    
  }

  const editName = ( id, name, number ) => {
    server 
      .editContact( id, name, number )
      .then( newContact => {
        setPersons( persons.map( p => p.id !== id ? p : newContact ) )
        setMessageType( 1 )
        setMessage( `Edited ${newName}'s number` )
        setTimeout(() => {
          setMessage( null )
        }, 3000)
        setNewName( '' )
        setNewPhone( '' )
        setFilterText( '' )
      })
      .catch( err => {
        // setPersons( persons.filter( p => p.id !== id ) )
        setMessageType( 2 )
        if ( err.response.status === 400 )
          setMessage( `Please enter a valid number` )
        else 
          setMessage( 'There was an unexpected error. Please try again later' )
        setTimeout(() => {
          setMessage( null )
        }, 3000)
        setNewName( '' )
        setNewPhone( '' )
        setFilterText( '' )
      })
  }

  const delFunc = ( id ) =>
    () => {
      const toBeDeleted = persons.find( p => p.id === id )

      if ( window.confirm( `Delete ${toBeDeleted.name}?` ) ) {
        server  
          .deleteContact( id )
          .then( _ => {
            setPersons( persons.filter( p => p.id !== id ) )
            setMessageType( 1 )
            setMessage( `Successfully deleted ${ toBeDeleted.name }` )
            setTimeout(() => {
              setMessage( null )
            }, 3000)
          })
          .catch( err => { 
            setPersons( persons.filter( p => p.id !== id ) )
            setMessageType( 2 )
            setMessage( `The contact ${ toBeDeleted.name } has already been deleted` )
            setTimeout(() => {
              setMessage( null )
            }, 3000)
          } )
      }
    }

  const personsToShow =
    filterText === ''
    ? persons 
    : persons.filter( p => p.name.toLowerCase().includes( filterText.trim().toLowerCase() ) )

  const effect = () => {
    server
      .getContacts()
      .then( contacts => 
        setPersons( contacts )
      )
  }

  useEffect( effect, [] )

  return (
    <div>
      <h2>Phonebook</h2>

      <Message message={ message } messageType={ messageType } />

      <FilterForm val={ filterText } onEdit={ e => setFilterText( e.target.value ) } />

      <h2>add a new</h2>

      <NewContactForm 
        persons={ persons }
        nameVal={ newName } 
        onNameChange={ e => setNewName( e.target.value ) }
        phoneVal={ newPhone }
        onPhoneChange={ e => setNewPhone( e.target.value ) }
        onSubmit={ addName }
        onEdit ={ editName }
      />

      <h2>Numbers</h2>

      <Numbers ppl={ personsToShow } delFunc={ delFunc }/>
    </div>
  )
}

export default App;
