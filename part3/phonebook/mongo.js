const mongoose = require( 'mongoose' )

// eslint-disable-next-line no-undef
if ( ![ 3, 5 ].includes( process.argv.length ) ) {
  console.log( 'Usage: node mongo.js <password> <name> <phone> (to add a number) or node mongo.js <password> (to view all numbers)' )
  // eslint-disable-next-line no-undef
  process.exit( 1 )
}

// eslint-disable-next-line no-undef
const password = process.argv[2]
// eslint-disable-next-line no-undef
const name = process.argv[3]
// eslint-disable-next-line no-undef
const phone = process.argv[4]

const url = `mongodb+srv://fullstack:${password}@cluster0.y95w385.mongodb.net/phoneBook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema( {
  name: String,
  phone: String
} )

const Person = mongoose.model( 'Person', personSchema )

mongoose
  .connect( url )
  .then( () => {
    console.log( 'Connected to database!' )

    if ( name ) {
      const person1 = new Person( {
        name: name,
        phone: phone
      } )

      return person1.save()
    }

    else {
      return Person.find( {} )
    }
  } )
  .then( response => {
    if ( name )
      console.log( 'Note saved!' )

    else {
      console.log( '\nphonebook:' )

      response.forEach( p => {
        console.log( `${p.name} ${p.phone}` )
      } )

      console.log( '\n' )
    }

    mongoose.connection.close()
  } )