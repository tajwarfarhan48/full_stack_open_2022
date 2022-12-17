const FilterForm = ({ val, onEdit }) => {
    return ( 
        <form onSubmit={ e => e.preventDefault() }>
        <div>
          filter shown with <input value={ val } onChange={ onEdit } />
        </div>
      </form>
     );
}
 
export default FilterForm;