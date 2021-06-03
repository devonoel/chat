import { render, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import App from './App';

test('renders learn react link', () => {
  act(() => { render(<App />) });
  const headerElement = screen.getByText(/chat app/i);
  expect(headerElement).toBeInTheDocument();
});
