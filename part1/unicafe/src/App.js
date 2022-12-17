import { useState } from 'react';

const Button = ({ onClick, text }) => (
  <button onClick={ onClick }>{ text }</button>
)

const Statistics = ({ good, neutral, bad, all, average, percentage }) => {
  if ( all === 0 && neutral === 0 && bad === 0 ) 
    return ( 
      <div className="stats">
        <h1>Statistics</h1>
        <div>No feedback given</div>
      </div>
    );

  return (
    <div className="stats">
      <h1>Statistics</h1>

      <table>
        <tbody>

          <StatisticLine text="good" value={ good }/>          
          <StatisticLine text="neutral" value={ neutral }/>
          <StatisticLine text="bad" value={ bad }/>
          <StatisticLine text="average" value={ average.toFixed( 1 ) }/>
          <StatisticLine text="positive" value={ percentage.toFixed( 1 ) + " %" }/>

        </tbody>
      </table>
    </div>
  );
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{ text }</td>
    <td>{ value }</td>
  </tr>
)

const App = () => {
  const [ good, setGood ] = useState( 0 );
  const [ neutral, setNeutral ] = useState( 0 );
  const [ bad, setBad ] = useState( 0 );

  const all = good + neutral + bad;
  const total = 1 * good + -1 * bad;

  const average = ( all === 0 ) ? 0 : total / all;
  const percentage = (all === 0 ) ? 0 : ( good / all ) * 100;

  const handleGood = () => setGood( good + 1 );
  const handleNeutral = () => setNeutral( neutral + 1 );
  const handleBad = () => setBad( bad + 1 );

  return (
    <div className="App">
      <h1>give feedback</h1>

      <Button onClick={ handleGood } text="good" />
      <Button onClick={ handleNeutral } text="neutral"/>
      <Button onClick={ handleBad } text="bad"/>

      <Statistics good={ good } neutral={ neutral } bad={ bad } all={ all } average={ average } percentage={ percentage } />
    </div>
  );
}

export default App;