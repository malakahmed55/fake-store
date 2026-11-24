import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main className="container state">
      <h2>Page not found</h2>
      <Link to="/">Back to products</Link>
    </main>
  );
}

export default NotFound;
