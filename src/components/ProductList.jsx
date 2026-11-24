import { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

const SORTS = {
  featured: () => 0,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  rating: (a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0),
};

export default function ProductList() {
  const { products, error } = useContext(ProductContext);
  const { add } = useCart();
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');

  const categories = useMemo(
    () => ['all', ...new Set(products.map((p) => p.category))],
    [products]
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products
      .filter((p) => category === 'all' || p.category === category)
      .filter((p) => !q || p.title.toLowerCase().includes(q))
      .sort(SORTS[sort]);
  }, [products, category, query, sort]);

  if (error) {
    return (
      <main className="container state">
        <p>Could not load products. Please try again later.</p>
      </main>
    );
  }

  if (products.length === 0) {
    return (
      <main className="container state">
        <p>Loading products...</p>
      </main>
    );
  }

  return (
    <main className="container">
      <section className="hero">
        <h1>Everyday essentials, simply made.</h1>
        <p>Clothing, jewelry and electronics. Browse the demo catalog and try the full checkout flow.</p>
      </section>

      <div className="toolbar">
        <input
          type="search"
          className="search"
          placeholder="Search products"
          aria-label="Search products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="select"
          aria-label="Sort products"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="rating">Top rated</option>
        </select>
      </div>

      <div className="filters">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={c === category ? 'chip active' : 'chip'}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="state">No products match your search.</p>
      ) : (
        <div className="grid">
          {visible.map((p) => (
            <article className="card" key={p.id}>
              <Link to={`/product/${p.id}`} className="card-img">
                <img src={p.image} alt={p.title} loading="lazy" />
              </Link>
              <div className="card-body">
                <span className="card-cat">{p.category}</span>
                <Link to={`/product/${p.id}`} className="card-title">{p.title}</Link>
                <div className="card-foot">
                  <span className="price">${p.price.toFixed(2)}</span>
                  {p.rating && <span className="rating">★ {p.rating.rate}</span>}
                </div>
                <button type="button" className="btn" onClick={() => add(p)}>
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
