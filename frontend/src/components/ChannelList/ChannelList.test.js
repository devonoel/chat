import { render, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import ChannelList from './ChannelList';

test('renders learn react link', () => {
  act(() => { render(<ChannelList />) });
  const headingElement = screen.getByText(/channels/i);
  expect(headingElement).toBeInTheDocument();
});

test('fetches channel list', async () => {
  const fakeChannels = [{ id: 1, name: 'general' }];
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeChannels)
    })
  );

  await act(async () => { render(<ChannelList />) });
  expect(screen.getByText(/general/i));
});
