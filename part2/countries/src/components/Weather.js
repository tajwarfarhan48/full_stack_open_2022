const Weather = ({ w }) => {
    if ( w.notFound ) 
        return ( <div>Weather Data Not Found</div>)

    if ( w.temperature === undefined || w.wind_speed === undefined ) 
        return ( <div>Loading...</div> )

    return (
        <>
        <div>temperature { w.temperature } Celcius</div>
        <img src={ w.iconLink } alt="Weather" />
        <div>wind { w.wind_speed } m/s</div>
        </>
    )
}
 
export default Weather;