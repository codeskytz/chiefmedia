import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders main heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /UPDATES/i });
  expect(heading).toBeInTheDocument();
});

test('hamburger toggles sidebar open/close', () => {
  render(<App />);
  const toggle = screen.getByLabelText(/Toggle navigation/i);
  const sidebar = screen.getByLabelText(/Side navigation/i);

  // initially closed
  expect(sidebar.classList.contains('open')).toBe(false);

  fireEvent.click(toggle);
  expect(sidebar.classList.contains('open')).toBe(true);

  fireEvent.click(toggle);
  expect(sidebar.classList.contains('open')).toBe(false);
});
