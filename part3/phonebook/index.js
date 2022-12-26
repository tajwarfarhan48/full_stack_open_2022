require( 'dotenv' ).config()
const express = require( 'express' )
const cors = require( 'cors' )

const app = express()
const Person = require( './models/note.js' )

app.use( cors() )
app.use( express.static('build') )
app.use( express.json() )

app.get( '/api/persons', ( req, res, next ) => {
  Person.find( {} )
    .then( persons => {
      return res.status( 200 ).json( persons )
    } )
    .catch( err => next( err ) )
})

app.get( '/info', ( req, res, next ) => {
  Person.find( {} )
    .then( persons => {
      const numContacts = persons.length
      const curDate = new Date()

      res.setHeader( 'Content-type', 'text/html' )
      return res.status( 200 ).send(
        `<p>Phonebook has info for ${numContacts} people</p><p>${curDate}</p>`
      ) } )
    .catch( err => next( err ) )
} )

app.get( '/api/persons/:id', ( req, res, next ) => {
  const reqID = req.params.id

  Person
    .findById( reqID )
    .then( person => {
      if ( person ) {
        return res.status( 200 ).json( person )
      }

      else {
        return res.status( 404 ).json( { error: 'Person not found' } )
      }
    } )
    .catch( err => next( err ) )
} )

app.delete( '/api/persons/:id', ( req, res, next ) => {
  const reqID = req.params.id

  Person
    .findByIdAndDelete( reqID )
    .then( () => {
      return res .status( 204 ).end()
    } )
    .catch( err => next( err ) )
} )

app.post( '/api/persons/' , ( req, res, next ) => {
  const newName = req.body.name
  const newNumber = req.body.number

  Person
    .find( { name: newName } )
    .then( p => {
      if ( p.length > 0 ) {
        return res.status( 422 ).json( { error: 'Person already exists' } )
      }

      const newPerson = new Person( {
        name: newName,
        number: newNumber
      } )

      newPerson
        .save( { runValidators: true, context: 'query' } )
        .then( nPerson => {
          return res .status( 200 ).json( nPerson )
        } )
        .catch( err => next( err ) )
    } )
    .catch( err => next( err ) )
} )

app.put( '/api/persons/:id', ( req, res, next ) => {
  const name = req.body.name
  const number = req.body.number
  const reqID = req.params.id

  Person
    .findByIdAndUpdate( reqID, { name, number }, { new: true, runValidators: true, context: 'query' } )
    .then( r => {
      return res.status( 200 ).json( r )
    } )
    .catch( err => next( err ) )
} )

const unknownEndpoint = ( req, res ) =>
  res.status( 404 ).json( { error: 'Unknown Endpoint' } )

app.use( unknownEndpoint )

const errorHandler = ( err, req, res, next ) => {
  if ( err.name === 'CastError' )
    return res.status( 400 ).json( { error: 'Invalid ID' } )

  if ( err.name === 'ValidationError' ) {
    if ( err.errors.name !== undefined )
      return res.status( 400 ).json( { error: err.errors.name['properties'].message } )
    else if ( err.errors.number !== undefined )
      return res.status( 400 ).json( { error: err.errors.number['properties'].message } )
    else
      return res.status( 400 ).json( { error: err.message } )
  }

  next( err )
}

app.use( errorHandler )

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001

app.listen( PORT, () => {
  console.log( `Server listening on port ${PORT}` )
} )