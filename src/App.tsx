import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const randQuote = getRandom()
  console.log(`randQuote: ${randQuote}`)

  return (
    <div className="App">
      <h1>Quote Search</h1>
      <form>
          <input type="text" />
      </form>
      <p>{{randQuote}}</p>
    </div>
  )
}

async function getRandom() {
  const result = await fetch("https://api.quotable.io/random");
  console.log(await result.json());
  return result.json();
}

async function getAuthorQuotes(author) {
    const result = await fetch('https://api.quotable.io/search/quotes?query=${author}&fields=author');
    console.log(await result.json()); 
}

export default App

