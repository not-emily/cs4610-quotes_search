import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [randQuote, setRandQuote] = useState("");

  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then(r => r.json())
      .then(quote => setRandQuote(quote));
  }, []);


  async function getRandom() {
    const result = await fetch("https://api.quotable.io/random");
    console.log(await result.json());
    return result.json();
  }

  return (
    <div className="App">
      <h1>Quote Search</h1>
      <input 
        type="text" 
        value={searchTerm}
        placeholder="Albert Einstein"
        onChange={e => setSearchTerm(e.target.value)}
      />
      <p class="rand-quote">{randQuote.content}</p>
      <p class="rand-author">- {randQuote.author}</p>
    </div>
  )
}


async function getAuthorQuotes(author) {
    const result = await fetch('https://api.quotable.io/search/quotes?query=${author}&fields=author');
    console.log(await result.json()); 
}

export default App

