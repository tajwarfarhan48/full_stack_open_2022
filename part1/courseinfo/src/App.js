function App() {
  const course = {
    name: 'Half Stack application development',

    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },

      {
        name: 'Using props to pass data',
        exercises: 7
      },

      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={ course.name } />
      <Content parts={ course.parts } />
      <Total total={ course.parts.map(e => e.exercises).reduce((a, b) => a+b, 0) }/> 
    </div>
  );
}

const Header = ( props ) => (
  <h1>{ props.course }</h1>
)

const Content = ( props ) => (
  <div>
    {
      props.parts.map(e => <Part name={ e.name } exercises={ e.exercises } />)
    }
  </div>
)

const Part = ( props ) => (
  <p>
    { props.name } { props.exercises }
  </p>
)

const Total = ( props ) => (
  <p>Number of exercises { props.total }</p>
)

export default App;
