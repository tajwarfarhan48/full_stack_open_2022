const SearchBar = ({ text, onEdit }) => {
    return ( 
        <form onSubmit={ e => e.preventDefault() }>
            <p>
                find countries 
                <input value={ text } onChange={ onEdit }/>
            </p>
        </form>
     );
}
 
export default SearchBar;