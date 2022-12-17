import { useState } from 'react';

const MainDisplay = ({ text, numVotes }) => (
  <div>
    <h1>Anecdote of the day</h1>
    <div>{ text }</div>
    <div>has { numVotes } votes</div>
  </div>
)

const Button = ({ onClick, text }) => (
  <button onClick={ onClick }>{ text }</button>
)

const MostVotes = ({ text }) => (
  <div>
    <h1>Anecdote with most votes</h1>
    <div>{ text }</div>
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [ selected, setSelected ] = useState( 0 );
  
  const [ votes, setVotes ] = useState( { 
    votes: Array( anecdotes.length ).fill( 0 ),
    max: 0
  } );

  const handleVote = () => {
    const votesCopy = {...votes};

    votesCopy.votes[selected] += 1;
    votesCopy.max = votesCopy.votes.indexOf( Math.max( ...votesCopy.votes ) );

    setVotes( votesCopy );
  }

  const handleNext = () => {
    let next = Math.floor( Math.random() * anecdotes.length );

    while ( next === selected )
      next = Math.floor( Math.random() * anecdotes.length );

    setSelected( next );
  }

  console.log( votes );

  return (
    <div className="App">
      <MainDisplay text={ anecdotes[selected] } numVotes={votes.votes[selected]} />
      
      <Button onClick={ handleVote } text="vote" />
      <Button onClick={ handleNext } text="next anecdote" />

      <MostVotes text={ anecdotes[votes.max] } />
    </div>
  )
}

export default App;
