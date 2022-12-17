import { useEffect, useState } from "react";
import axios from 'axios'

import SearchBar from './components/SearchBar'
import Display from './components/Display.js'

const App = () => {
  const [ search, setSearch ] = useState( '' )
  const [ countries, setCountries ] = useState( [] )
  const [ viewCountry, setViewCountry ] = useState( '' )
  const [ weather, setWeather ] = useState( {} )

  const countriesLink = 'https://restcountries.com/v2/all'

  const onSearchEdit = e => {
    setSearch( e.target.value )
    setViewCountry( '' )
    setWeather( {} )
  }

  const handleShow = 
    c => () => {
      defineWeather( c )
      setViewCountry( c.name )
    }

  const defineWeather = c => {
    const apiKey = process.env.REACT_APP_WEATHER_KEY 

    const geoLink = `http://api.openweathermap.org/geo/1.0/direct?q=${c.capital},${c.alpha2Code}&limit=1&appid=${apiKey}`

    axios 
      .get( geoLink )
      .then(response => {
        if ( response.data.length === 0 ) setWeather({ notFound: true })

        else {
          const lat = response.data[0].lat
          const lon = response.data[0].lon 

          const weatherLink = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`

          axios
          .get( weatherLink )
          .then( response => { 
            let newWeather = {
              temperature: response.data.main.temp,
              wind_speed: response.data.wind.speed,
              iconLink: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
            }

            setWeather( newWeather )
          } )
        }
       } )

       
  }

  const loadCountries = () => {
    axios
      .get( countriesLink )
      .then( response => {  
        setCountries( response.data )
      } )
  }

  useEffect( loadCountries, [] )

  const countriesToShow = 
    ( viewCountry !== '' ) 
      ? 
    countries.filter( c => c.name.toLowerCase() === viewCountry.toLowerCase() )
      :
    ( search !== '' )
      ?
    countries.filter( c => c.name.toLowerCase().includes( search.toLowerCase() ) ) 
      :
    []

  return ( 
    <>
      <SearchBar text={ search } onEdit={ onSearchEdit } />
      <Display 
        cList={ countriesToShow } 
        viewCountry={ viewCountry }
        handleShow={ handleShow }
        weather={ weather }
      />
    </>
   );
}
 
export default App;
