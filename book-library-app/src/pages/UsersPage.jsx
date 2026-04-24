import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import UserCard from '../components/UserCard'
import { useLibrary } from '../context/LibraryContext'

function UsersPage() {
  const { usersWithRentedBooks, loading, error } = useLibrary()

  return (
    <section className="page">
      <header className="page-header">
        <h1>Users</h1>
        <p>Each user includes rented books mapped to book names.</p>
      </header>

      {loading && <LoadingState />}
      {error && !loading && <ErrorState message={error} />}

      {!loading && !error && (
        <div className="grid">
          {usersWithRentedBooks.map((user) => (
            <UserCard key={user.userID} user={user} />
          ))}
        </div>
      )}
    </section>
  )
}

export default UsersPage
