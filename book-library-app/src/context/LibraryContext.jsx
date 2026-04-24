/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getLibraryData } from '../services/apiService'

const LibraryContext = createContext(null)

export function LibraryProvider({ children }) {
  const [authors, setAuthors] = useState([])
  const [books, setBooks] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        setError('')
        const { authors: apiAuthors, books: apiBooks, users: apiUsers } =
          await getLibraryData()
        setAuthors(apiAuthors)
        setBooks(apiBooks)
        setUsers(apiUsers)
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const authorsById = useMemo(() => {
    return new Map(authors.map((author) => [author.authorID, author]))
  }, [authors])

  const booksById = useMemo(() => {
    return new Map(books.map((book) => [book.bookID, book]))
  }, [books])

  const booksWithAuthors = useMemo(() => {
    return books.map((book) => ({
      ...book,
      authorName: authorsById.get(book.authorID)?.authorName ?? 'Unknown author',
    }))
  }, [authorsById, books])

  const usersWithRentedBooks = useMemo(() => {
    return users.map((user) => ({
      ...user,
      rentedBooks: user.rentedBookIDs
        .map((bookID) => booksById.get(bookID))
        .filter(Boolean),
    }))
  }, [booksById, users])

  const rentBook = (userID, bookID) => {
    let duplicateRental = false

    setUsers((currentUsers) =>
      currentUsers.map((user) => {
        if (user.userID !== userID) {
          return user
        }

        if (user.rentedBookIDs.includes(bookID)) {
          duplicateRental = true
          return user
        }

        return {
          ...user,
          rentedBookIDs: [...user.rentedBookIDs, bookID],
        }
      }),
    )

    return !duplicateRental
  }

  const contextValue = {
    authors,
    books,
    users,
    booksWithAuthors,
    usersWithRentedBooks,
    loading,
    error,
    rentBook,
  }

  return (
    <LibraryContext.Provider value={contextValue}>
      {children}
    </LibraryContext.Provider>
  )
}

export function useLibrary() {
  const context = useContext(LibraryContext)

  if (!context) {
    throw new Error('useLibrary must be used inside LibraryProvider')
  }

  return context
}
