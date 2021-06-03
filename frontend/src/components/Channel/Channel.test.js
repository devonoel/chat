import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from "react-router-dom";
import Channel from './Channel';

let setState = jest.fn();

beforeEach(() => {
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(setState([]))
    })
  );
});

test('renders channel name', () => {
  act(() => { render(<Router><Channel name="example"/></Router>) });
  const headingElement = screen.getByText(/example/i);
  expect(headingElement).toBeInTheDocument();
});

test('fetches channel messages', async () => {
  const fakeMessages = [{id: 1, body: 'test', channel_id: 1, created_at: '1970-01-01 00:00:00'}];
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(setState(fakeMessages))
    })
  );

  await act(async () => { render(<Router><Channel name="example" /></Router>) });
  expect(setState).toHaveBeenCalledWith(fakeMessages);
});

test('updates message state when typing in text input', () => {
  act(() => { render(<Router><Channel name="example"/></Router>) });
  const textInput = screen.getByLabelText(/message/i);
  expect(textInput.value).toBe("");

  act(() => {
    fireEvent.change(textInput, { target: { value: "foo" } });
  });
  expect(setState).toHaveBeenCalledWith("foo");
});

test('sends message to backend on form submit', () => {
  act(() => { render(<Router><Channel name="example"/></Router>) });
  const textInput = screen.getByLabelText(/message/i);
  const form = textInput.parentElement

  const fetchSpy = jest.spyOn(global, "fetch")
  fetchSpy.mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(setState('foo'))
    })
  );

  act(() => { fireEvent.change(textInput, { target: { value: "foo" } }) });
  act(() => { fireEvent.submit(form) });

  expect(fetchSpy).toHaveBeenCalled();
})
