import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';

export default function App() {
  const [quotes, setQuotes] = useState([]);

  const [text, setText] = useState('');
  const [id, setId] = useState('')

  const onAddNewQuote = () => {

    let newQuote = {
      id: id,
      text: text
    }

    axios
      .post("http://localhost:8000/quotes/", newQuote)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })

  }

  const onDeleteQuote = (quoteID) => {

    axios
      .delete("http://localhost:8000/quotes/" + id)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })

  }

  const onShowQuote = () => {
    axios
      .get('http://localhost:8000/quotes')
      .then(response => {
        setQuotes(response.data)
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        console.log('clean up');
      });
  }

  const onUpdateQuote = () => {

    let updatedQuote = {
      id: id,
      text: text
    }

    axios
      .put('http://localhost:8000/quotes/' + id, updatedQuote,)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        console.log('clean up');
      });

  }




  useEffect(() => {
    console.log(quotes)
    return () => {
      console.log('cleanup')
    }
  }, [quotes])


  return (
    <main>
      <h1>Quotes</h1>
      <p>json-server to create fake rest API</p>
      <p>axios to make request</p>
      <p>
        npm run server for running server on 8000. Do it on different terminal
      </p>

      <input placeholder="Quote ID Here..." value={id} onChange={(e) => setId(e.target.value)} />


      <input style={{ width: '100%' }} placeholder="Quote Text Here..." value={text} onChange={(e) => setText(e.target.value)} />



      <button onClick={onAddNewQuote}> Add New Quote </button>
      <button onClick={onDeleteQuote}> Delete Quote </button>
      <button onClick={onShowQuote}> Show Quote </button>
      <button onClick={onUpdateQuote}> Update Quote </button>

      {quotes.map((q) => < li key={q.id} >{q.id} - {q.text}</li>)}


    </main>
  );
}
