import { useState, useEffect } from 'react'
import './App.css'

interface Quote {
  _id: number;
  content: string;
  author: string;
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [randQuote, setRandQuote] = useState("");
  const [searching, setSearching] = useState(true);

  useEffect(() => {
    // fetch("https://usu-quotes-mimic.vercel.app/api/random")
    //   .then(r => r.json())
    //   .then(quote => {
    //     setRandQuote(quote);
    //     console.log(quote);
    //   });
    getRandQuote();
  }, []);
  
  async function getRandQuote() {
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
    setRandQuote(await result.json());
  }


  return (
    <div className="App">
      <h1>Quote Search</h1>
      <form onSubmit={(e) => {
        setSearching(true); 
        console.log(searching);
        e.preventDefault();
        }}>
        <input 
          type="text" 
          value={searchTerm}
          placeholder="Albert Einstein"
          onChange={e => setSearchTerm(e.target.value)}
        />
      </form>
      <p className="rand-quote">{randQuote.content}</p>
      <p className="rand-author">- {randQuote.author}</p>
    </div>
  )
}


async function getAuthorQuotes(author) {
    const result = await fetch('https://api.quotable.io/search/quotes?query=${author}&fields=author');
    console.log(await result.json()); 
}

export default App

