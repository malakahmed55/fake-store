import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

export default function ProductList() {
  const { products } = useContext(ProductContext);

  return (
    <div>
      <h3>Products</h3>
      <center>
      {products.map(p => (
        <div key={p.id}>
          <img src={p.image} width="400" />
          <p>{p.title} - ${p.price}</p>
        </div>
      ))}
      </center>
    </div>
  );
}
