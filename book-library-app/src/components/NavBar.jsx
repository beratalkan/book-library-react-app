import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <header className="top-nav">
      <div className="brand">Book Library System</div>
      <nav className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Books
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? 'nav-link active' : 'nav-link'
          }
        >
          Users
        </NavLink>
      </nav>
    </header>
  )
}

export default NavBar
