import BookCard from '../components/BookCard'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import RentBookForm from '../components/RentBookForm'
import { useLibrary } from '../context/LibraryContext'

function HomePage() {
  const { booksWithAuthors, loading, error } = useLibrary()

  return (
    <section className="page">
      <header className="page-header">
        <h1>Books</h1>
        <p>Browse all books with mapped author names.</p>
      </header>

      {loading && <LoadingState />}
      {error && !loading && <ErrorState message={error} />}

      {!loading && !error && (
        <>
          <div className="grid">
            {booksWithAuthors.map((book) => (
              <BookCard key={book.bookID} book={book} />
            ))}
          </div>
          <RentBookForm />
        </>
      )}
    </section>
  )
}

export default HomePage
