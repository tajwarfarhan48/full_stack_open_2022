const mongoose = require( 'mongoose' )
// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI

console.log( `Connecting to ${url}` )

mongoose
  .connect( url )
  .then( () => {
    console.log( 'Connected to database!' )
  } )
  .catch( err => {
    console.log( err.message )
  } )

const personSchema = new mongoose.Schema( {
  name: {
    type: String,
    minLength: [ 3, 'Contact Name must be at least 3 characters long' ],
    required: [ true, 'Contact Name is required' ]
  },
  number: {
    type: String,
    required: [ true, 'Contact Number is required' ],
    validate: {
      validator: ( n ) => n.length >= 8 && /^[0-9]{2,3}-[0-9]{5,}$/.test( n ),
      message: 'Not a valid phone number'
    }
  }
} )

personSchema.set( 'toJSON', {
  transform: ( document, returnedObject ) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
    delete returnedObject._id
  }
} )

module.exports = mongoose.model( 'Person', personSchema )