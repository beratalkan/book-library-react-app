function BookCard({ book }) {
  return (
    <article className="card">
      <img
        className="book-image"
        src={book.imageUrl}
        alt={`${book.title} cover`}
        loading="lazy"
      />
      <h3 className="book-title">{book.title}</h3>
      <p className="meta">Author: {book.authorName}</p>
      <p className="meta">Release Year: {book.releaseYear}</p>
      <p className="meta">Price: ${Number(book.price).toFixed(2)}</p>
    </article>
  )
}

export default BookCard
