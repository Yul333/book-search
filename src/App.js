import axios from 'axios'
import { useState } from 'react'
import './App.css'

function App() {
  async function makeGetRequest(search) {
    let res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyBobZEVkpE7_20Bxux76ICQaR8N-1QPaWg`
    )

    let data = res.data
    console.log(data.items)
    setSearchResults(data.items)
  }

  const [searchField, setSearchField] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleChange = (event) => {
    const book = event.target.value
    setSearchField(book)
    console.log(book)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(searchField)
    makeGetRequest(searchField)
  }

  return (
    <div className='App'>
      <header>
        <h1>Book Search</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Search'
          value={searchField}
          onChange={handleChange}
        />
        <button type='submit'>Find me a Book!</button>
      </form>

      <div className='cards-container'>
        {searchResults.map((book) => (
          <div className='card'>
            <div className='card__title'>{book.volumeInfo.title} </div>

            <a target='blank' href={book.volumeInfo.previewLink}>
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.title}
              />
            </a>
            <div className='card__publish'>
              {book.volumeInfo.publishedDate}{' '}
            </div>
            <div className='card__author'>{book.volumeInfo.authors} </div>
            <div className='card__info'>{book.searchInfo.textSnippet} </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
