import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from "react-router-dom";
import Channel from './Channel';

test('renders channel name', () => {
  act(() => { render(<Router><Channel name="example"/></Router>) });
  const headingElement = screen.getByText(/example/i);
  expect(headingElement).toBeInTheDocument();
});

test('updates message state when typing in text input', () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  act(() => { render(<Router><Channel name="example"/></Router>) });
  const textInput = screen.getByLabelText(/message/i);
  expect(textInput.value).toBe("");

  act(() => {
    fireEvent.change(textInput, { target: { value: "foo" } });
  });
  expect(setState).toHaveBeenCalledWith("foo");
});

test('fetches channel messages', async () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  const fakeMessages = [{id: 1, body: 'test', channel_id: 1, created_at: '1970-01-01 00:00:00'}];
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(setState(fakeMessages))
    })
  );

  await act(async () => { render(<Router><Channel name="example" /></Router>) });
  expect(setState).toHaveBeenCalledWith(fakeMessages);
});
