import { render, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from "react-router-dom";
import Channel from './Channel';

test('renders channel name', () => {
  act(() => { render(<Router><Channel name="example"/></Router>) });
  const headingElement = screen.getByText(/example/i);
  expect(headingElement).toBeInTheDocument();
});
