import { useState, useEffect } from 'react'
import './index.css'

interface Quote {
  _id: number;
  content: string;
  author: string;
}

function App() {
  const [randQuote, setRandQuote] = useState<Quote | null>(null);
  const [authorQuotes, setAuthorQuotes] = useState<Quote[]>([])
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    getRandQuote();
  }, []);

  async function getRandQuote() {
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
    const json = await result.json();
    const quote: Quote = {
      _id: json.id,
      content: json.content, 
      author: json.author
    };
    setRandQuote(quote);

  }

  async function getAuthorQuotes(author: string) {
      const result = await fetch(`https://usu-quotes-mimic.vercel.app/api/search?query=${author}`);
      const body = await result.json(); 
      setAuthorQuotes(body.results);
  }

  return (
    <div className="App">
      <div className={searching ? "searching" : "not-searching"}>
        <h1>Quote Search</h1>
        <form onSubmit={(e) => {
          if (searchTerm != "") {
            setSearching(true); 
            getAuthorQuotes(searchTerm)
          } else {
            setSearching(false);
          }
          console.log(`Searching: ${searching}`);
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
            !searching && randQuote != null ? (
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
    </div>
  )
}

export default App

