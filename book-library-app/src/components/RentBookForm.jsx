import { useMemo, useState } from 'react'
import { useLibrary } from '../context/LibraryContext'

function RentBookForm() {
  const { users, booksWithAuthors, rentBook } = useLibrary()
  const [selectedUserID, setSelectedUserID] = useState('')
  const [selectedBookID, setSelectedBookID] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

  const sortedUsers = useMemo(
    () => [...users].sort((first, second) => first.name.localeCompare(second.name)),
    [users],
  )

  const sortedBooks = useMemo(
    () =>
      [...booksWithAuthors].sort((first, second) =>
        first.title.localeCompare(second.title),
      ),
    [booksWithAuthors],
  )

  function handleSubmit(event) {
    event.preventDefault()

    const userID = Number(selectedUserID)
    const bookID = Number(selectedBookID)

    if (!userID || !bookID) {
      setMessageType('warning')
      setMessage('Please select both a user and a book.')
      return
    }

    const rented = rentBook(userID, bookID)

    if (!rented) {
      setMessageType('warning')
      setMessage('This user already rented the selected book.')
      return
    }

    setMessageType('success')
    setMessage('Book rented successfully. The user list is now updated.')
  }

  return (
    <section className="rent-panel">
      <h2>Rent a Book</h2>
      <form className="rent-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userSelect">User</label>
          <select
            id="userSelect"
            value={selectedUserID}
            onChange={(event) => setSelectedUserID(event.target.value)}
          >
            <option value="">Select a user</option>
            {sortedUsers.map((user) => (
              <option key={user.userID} value={user.userID}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="bookSelect">Book</label>
          <select
            id="bookSelect"
            value={selectedBookID}
            onChange={(event) => setSelectedBookID(event.target.value)}
          >
            <option value="">Select a book</option>
            {sortedBooks.map((book) => (
              <option key={book.bookID} value={book.bookID}>
                {book.title} ({book.authorName})
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn">
          Rent Book
        </button>
      </form>

      {message && <p className={`message ${messageType}`}>{message}</p>}
    </section>
  )
}

export default RentBookForm
