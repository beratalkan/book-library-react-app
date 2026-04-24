function ErrorState({ message }) {
  return (
    <div className="error-box">
      Could not load data from JSON API sources. Details: {message}
    </div>
  )
}

export default ErrorState
