import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

export default function ProductPage() {
  const { id } = useParams();
  const { products, error } = useContext(ProductContext);
  const { add } = useCart();

  if (error) return <main className="container state"><p>Could not load products.</p></main>;
  if (products.length === 0) return <main className="container state"><p>Loading product...</p></main>;

  const product = products.find((p) => String(p.id) === id);
  if (!product) {
    return (
      <main className="container state">
        <h2>Product not found</h2>
        <Link to="/">Back to shop</Link>
      </main>
    );
  }

  return (
    <main className="container">
      <Link to="/" className="back">← Back to shop</Link>
      <div className="detail">
        <div className="detail-img">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="detail-info">
          <span className="card-cat">{product.category}</span>
          <h1>{product.title}</h1>
          {product.rating && (
            <p className="rating">★ {product.rating.rate} ({product.rating.count} reviews)</p>
          )}
          <p className="detail-price">${product.price.toFixed(2)}</p>
          <p className="detail-desc">{product.description}</p>
          <button type="button" className="btn btn-lg" onClick={() => add(product)}>
            Add to cart
          </button>
          <p className="note">Demo product. It cannot be purchased or shipped.</p>
        </div>
      </div>
    </main>
  );
}
