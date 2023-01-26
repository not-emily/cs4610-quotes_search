import { useState, useEffect } from 'react'
import './index.css'

interface Quote {
  _id: number;
  content: string;
  author: string;
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [randQuote, setRandQuote] = useState("");
  const [authorQuotes, setAuthorQuotes] = useState<Quote[]>([])
  const [searching, setSearching] = useState(false);

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
      const body = await result.json(); 
      setAuthorQuotes(body.results);
  }

  // function showHideRandom(searching: boolean) {
  //   if (searching == true) {
  //     document.getElementById("random-quote-block")!.style.visibility="hidden";
  //   }
  //   else {
  //     document.getElementById("random-quote-block")!.style.visibility="visible";
  //   }
  // }

  // function displayAuthorQuotes(quotes) {
  //   for (let i=0; i<quotes.len; i++) {
  //     console.log(quotes[i].author);
  //   }
  // }

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
        if (searching) {getAuthorQuotes(searchTerm)}
        e.preventDefault();
        }}>
        <input 
          type="text" 
          value={searchTerm}
          placeholder="Albert Einstein"
          onChange={e => setSearchTerm(e.target.value)}
        />
      </form>
      <div className="results">
        {
          !searching ? (
          <div className="quote">
            <p className="quote__content">{randQuote.content}</p>
            <p className="quote__author">- {randQuote.author}</p>
          </div>
          ) : null
        }
        {
          searching ? (
          authorQuotes.map((quote) => (
            <div className="quote" key={quote._id}>
              <p className="quote__content">{quote.content}</p>
              <p className="quote__author">- {quote.author}</p>
            </div>
          ))
          ) : null
        }
      </div>
    </div>
  )
}

export default App

