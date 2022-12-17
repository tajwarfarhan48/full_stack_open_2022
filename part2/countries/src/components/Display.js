import Weather from './Weather'

const Display = ({ cList, viewCountry, handleShow, weather }) => {
    const c = cList[0]

    if ( cList.length > 10 )
        return (
            <div>Too many matches, specify another filter</div>
        )

    if ( viewCountry === '' )
        return (
            cList.map( c => 
                <div key={ c.population }>
                    { c.name } 
                    <button onClick={ handleShow( c ) }>show</button>
                </div>
            )
        )
    
    else {
        return (
            <>
            <h1>{ c.name }</h1>

            <div>capital { c.capital || 'Unknown' }</div>
            <div>area { c.area } </div>

            <h2>languages: </h2>

            <ul>
                { c.languages.map( l => 
                    <li key={ l.name }>{ l.name }</li>
                ) }
            </ul>

            <img 
                style={ 
                    { maxWidth: "400px" } 
                } 
                    src={ c.flag } 
                    alt="flag"/>

            <h2>Weather in { c.capital || c.name }:</h2>
            
            <Weather w={ weather } />
            </>
        )
    }
}
 
export default Display;