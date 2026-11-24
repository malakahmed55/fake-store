import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, subtotal, setQty, remove } = useCart();

  if (items.length === 0) {
    return (
      <main className="container state">
        <h2>Your cart is empty</h2>
        <Link to="/">Continue shopping</Link>
      </main>
    );
  }

  return (
    <main className="container">
      <h1 className="page-title">Your cart</h1>
      <div className="cart-layout">
        <ul className="cart-list">
          {items.map((i) => (
            <li key={i.id} className="cart-item">
              <img src={i.image} alt={i.title} />
              <div className="cart-info">
                <Link to={`/product/${i.id}`}>{i.title}</Link>
                <span className="price">${i.price.toFixed(2)}</span>
              </div>
              <div className="qty">
                <button type="button" aria-label="Decrease quantity" onClick={() => setQty(i.id, i.qty - 1)}>−</button>
                <span>{i.qty}</span>
                <button type="button" aria-label="Increase quantity" onClick={() => setQty(i.id, i.qty + 1)}>+</button>
              </div>
              <button type="button" className="link-btn" onClick={() => remove(i.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <aside className="summary">
          <h2>Order summary</h2>
          <div className="row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <Link to="/checkout" className="btn btn-lg">Review order</Link>
        </aside>
      </div>
    </main>
  );
}
