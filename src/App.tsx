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
  const [authorQuotes, setAuthorQuotes] = useState("")
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

  async function getAuthorQuotes(author: string) {
      const result = await fetch(`https://usu-quotes-mimic.vercel.app/api/search?query=${author}`);
      setAuthorQuotes(await result.json()); 
      console.log(authorQuotes.results);
  }

  function showHideRandom(searching: boolean) {
    if (searching == true) {
      document.getElementById("random-quote-block")!.style.visibility="hidden";
    }
    else {
      document.getElementById("random-quote-block")!.style.visibility="visible";
    }
  }

  return (
    <div className="App">
      <h1>Quote Search</h1>
      <form onSubmit={(e) => {
        if (searchTerm != "") {
          setSearching(true); 
        } else {
          setSearching(false);
        }
        console.log(`Searching: ${searching}`);
        showHideRandom(searching);
        getAuthorQuotes(searchTerm);
        e.preventDefault();
        }}>
        <input 
          type="text" 
          value={searchTerm}
          placeholder="Albert Einstein"
          onChange={e => setSearchTerm(e.target.value)}
        />
      </form>
      <div id="random-quote-block">
        <p className="rand-quote">{randQuote.content}</p>
        <p className="rand-author">- {randQuote.author}</p>
      </div>
    </div>
  )
}

export default App

