const AUTHORS_URL =
  'https://raw.githubusercontent.com/emindk/JSON_Files/refs/heads/main/authors.json'
const BOOKS_URL =
  'https://raw.githubusercontent.com/emindk/JSON_Files/refs/heads/main/books.json'
const USERS_URL =
  'https://raw.githubusercontent.com/emindk/JSON_Files/refs/heads/main/users.json'

async function fetchJson(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url} (${response.status})`)
  }

  return response.json()
}

export async function getLibraryData() {
  const [authors, books, users] = await Promise.all([
    fetchJson(AUTHORS_URL),
    fetchJson(BOOKS_URL),
    fetchJson(USERS_URL),
  ])

  return { authors, books, users }
}
