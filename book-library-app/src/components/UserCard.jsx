function UserCard({ user }) {
  return (
    <article className="card">
      <h3 className="user-name">{user.name}</h3>
      <p className="meta">{user.email}</p>
      <p className="meta">
        Rented Books:{' '}
        {user.rentedBooks.length > 0
          ? user.rentedBooks.map((book) => book.title).join(', ')
          : 'No rented books'}
      </p>
    </article>
  )
}

export default UserCard
