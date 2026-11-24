import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function NavBar() {
  const { count } = useCart();
  return (
    <>
      <div className="demo-banner">
        Demo store: no real products are sold and no payments are taken.
      </div>
      <header className="site-header">
        <div className="container">
          <Link to="/" className="brand">Fake Store</Link>
          <nav className="nav-links">
            <Link to="/">Shop</Link>
            <Link to="/cart" className="cart-link">
              Cart <span className="badge">{count}</span>
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}

export default NavBar;
