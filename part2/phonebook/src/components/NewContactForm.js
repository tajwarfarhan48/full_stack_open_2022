const NewContactForm = ({ persons, nameVal, onNameChange, phoneVal, onPhoneChange, onSubmit, onEdit }) => {
    const processClick = e => {
        e.preventDefault()

        const match = persons.find( p =>
            p.name === nameVal
        )

        if ( match !== undefined ) {
            if ( window.confirm( `${nameVal} is already added to phonebook, replace the old number with a new one?` ) ) {
                onEdit( match.id, match.name, phoneVal )
            }
        }

        else {
            onSubmit( e )
        }
    }

    return ( 
        <form onSubmit={ processClick }>
            <div>
            name: <input value={ nameVal } onChange={ onNameChange }/>
            </div>
            <div>
            number: <input value={ phoneVal } onChange={ onPhoneChange }/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
     );
}
 
export default NewContactForm;