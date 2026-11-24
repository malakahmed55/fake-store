import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL || "https://fakestoreapi.com/products")
      .then(res => setProducts(res.data))
      .catch(() => setError(true));
  }, []);

  return (
    <ProductContext.Provider value={{ products, error }}>
      {children}
    </ProductContext.Provider>
  );
}
