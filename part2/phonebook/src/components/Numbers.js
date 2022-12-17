const Numbers = ({ ppl, delFunc }) => {
    return ( 
        ppl.map( p => 
            <Person key={ p.id } person={ p } delFunc={ delFunc } />
        )
     );
}

const Person = ({ person, delFunc }) =>
    <div>{ person.name } { person.number } <button onClick={ delFunc( person.id ) }>Delete</button></div>
 
export default Numbers;