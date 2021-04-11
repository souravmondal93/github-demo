import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputForm from './input-form';


const setup = () => {
  const submitHandler = jest.fn();
  const utils = render(<InputForm submitHandler={submitHandler} />);
  const formElement = utils.container.getElementsByTagName('form').item(0)!;
  const inputElement = utils.container.getElementsByTagName('input').item(0)!;
  const submitButton = utils.container.getElementsByTagName('button').item(0)!;

  return {
    formElement,
    inputElement,
    submitButton,
    submitHandler,
    utils
  }
}

test('It should renders input and button', () => {
  const { inputElement, submitButton } = setup();

  expect(inputElement).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test('It should allow characters to be entered', () => {
  const { inputElement } = setup();
  fireEvent.change(inputElement, { target: { value: 'hello world' } });
  expect(inputElement.value).toBe('hello world')
});

test('It should allow form to be submitted', () => {
  const { submitButton, submitHandler } = setup();
  fireEvent.submit(submitButton);
  expect(submitHandler).toHaveBeenCalledTimes(1)
})