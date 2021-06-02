import { render, screen } from '@testing-library/react';
import ChannelList from './ChannelList';

test('renders learn react link', () => {
  render(<ChannelList />);
  const headingElement = screen.getByText(/channels/i);
  expect(headingElement).toBeInTheDocument();
});
