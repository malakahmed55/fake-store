import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import App from './App';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';

jest.mock('axios', () => ({ __esModule: true, default: { get: jest.fn() } }));

const items = [
  { id: 1, title: 'Backpack', price: 10, image: 'a.png', category: 'bags', description: 'A bag', rating: { rate: 4, count: 3 } },
  { id: 2, title: 'Ring', price: 20, image: 'b.png', category: 'jewelery', description: 'A ring', rating: { rate: 5, count: 9 } },
];

const renderApp = (path = '/') =>
  render(
    <ProductProvider>
      <CartProvider>
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>
      </CartProvider>
    </ProductProvider>
  );

beforeEach(() => localStorage.clear());

test('shows products returned by the API', async () => {
  axios.get.mockResolvedValue({ data: items });
  renderApp();
  expect(await screen.findByText('Backpack')).toBeInTheDocument();
  expect(screen.getByText('$20.00')).toBeInTheDocument();
});

test('filters by category and search', async () => {
  axios.get.mockResolvedValue({ data: items });
  renderApp();
  await screen.findByText('Backpack');
  fireEvent.click(screen.getByRole('button', { name: 'jewelery' }));
  expect(screen.queryByText('Backpack')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'all' }));
  fireEvent.change(screen.getByLabelText('Search products'), { target: { value: 'bag' } });
  expect(screen.queryByText('Ring')).not.toBeInTheDocument();
});

test('shows an error message when the API fails', async () => {
  axios.get.mockRejectedValue(new Error('network'));
  renderApp();
  expect(await screen.findByText(/could not load products/i)).toBeInTheDocument();
});

test('product page shows details', async () => {
  axios.get.mockResolvedValue({ data: items });
  renderApp('/product/2');
  expect(await screen.findByText('A ring')).toBeInTheDocument();
});

test('adding to cart updates the count, total and demo checkout clears it', async () => {
  axios.get.mockResolvedValue({ data: items });
  renderApp();
  await screen.findByText('Backpack');
  const buttons = screen.getAllByRole('button', { name: 'Add to cart' });
  fireEvent.click(buttons[0]);
  fireEvent.click(buttons[0]);
  fireEvent.click(buttons[1]);
  fireEvent.click(screen.getByText('Cart'));
  expect(screen.getByText('$40.00')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Review order'));
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Sam' } });
  fireEvent.click(screen.getByRole('button', { name: 'Place demo order' }));
  expect(screen.getByText(/no payment was taken/i)).toBeInTheDocument();
  expect(localStorage.getItem('fake-store-cart')).toBe('[]');
});
