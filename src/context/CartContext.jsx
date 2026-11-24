import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const CartContext = createContext();
const STORAGE_KEY = 'fake-store-cart';

function reducer(items, action) {
  switch (action.type) {
    case 'add': {
      const found = items.find((i) => i.id === action.product.id);
      if (found) {
        return items.map((i) => (i.id === found.id ? { ...i, qty: i.qty + 1 } : i));
      }
      const { id, title, price, image } = action.product;
      return [...items, { id, title, price, image, qty: 1 }];
    }
    case 'setQty':
      return items
        .map((i) => (i.id === action.id ? { ...i, qty: action.qty } : i))
        .filter((i) => i.qty > 0);
    case 'remove':
      return items.filter((i) => i.id !== action.id);
    case 'clear':
      return [];
    default:
      return items;
  }
}

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [], load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((n, i) => n + i.qty * i.price, 0),
      add: (product) => dispatch({ type: 'add', product }),
      setQty: (id, qty) => dispatch({ type: 'setQty', id, qty }),
      remove: (id) => dispatch({ type: 'remove', id }),
      clear: () => dispatch({ type: 'clear' }),
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
