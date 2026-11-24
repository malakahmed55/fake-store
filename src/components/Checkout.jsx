import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const [name, setName] = useState('');
  const [placed, setPlaced] = useState(null);

  if (placed) {
    return (
      <main className="container state">
        <h2>Demo order complete</h2>
        <p>
          Thanks, {placed.name}. This was a demonstration. No order was placed,
          nothing will be shipped and no payment was taken.
        </p>
        <Link to="/">Back to shop</Link>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="container state">
        <h2>Nothing to review</h2>
        <Link to="/">Continue shopping</Link>
      </main>
    );
  }

  const submit = (e) => {
    e.preventDefault();
    setPlaced({ name: name.trim() });
    clear();
  };

  return (
    <main className="container">
      <h1 className="page-title">Review your order</h1>
      <div className="cart-layout">
        <form className="form" onSubmit={submit}>
          <p className="note">
            Demo checkout. Do not enter real personal or payment details: this
            form collects only a name and nothing is sent anywhere.
          </p>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Any name"
          />
          <button type="submit" className="btn btn-lg">Place demo order</button>
        </form>
        <aside className="summary">
          <h2>Items</h2>
          {items.map((i) => (
            <div className="row" key={i.id}>
              <span>{i.qty} × {i.title}</span>
              <span>${(i.qty * i.price).toFixed(2)}</span>
            </div>
          ))}
          <div className="row total"><span>Total</span><span>${subtotal.toFixed(2)}</span></div>
        </aside>
      </div>
    </main>
  );
}
