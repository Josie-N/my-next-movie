import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {FormCreateUserView} from "../FormCreateUserView";
import {FormCreateUserLogic} from "../../FormCreateUserLogic/FormCreateUserLogic";
import {wrapper} from "../../../../utils/tests/queryClientProviderWrapper";

describe('FormCreateUserView', () => {
  beforeEach(() => {
    render(<FormCreateUserLogic/>, {wrapper});
  });

  it('should have a main heading describing the form', () => {
    expect(screen.getByRole('heading', {name: /Create new account/i})).toBeInTheDocument();
  });

  it('should have label describing the input field', () => {
    const label = screen.getByLabelText(/Username/i);

    expect(label).toBeInTheDocument();
  });

  it('should have a username input field', () => {
    const userInput = screen.getByLabelText(/Username/i) as HTMLInputElement;
    expect(userInput).toBeInTheDocument();
  });

  it('should have a submit button', () => {
    expect(screen.getByRole('button', {name: /Create/i})).toBeInTheDocument();
  });

  it('should have a cancel button', () => {
    expect(screen.getByRole('button', {name: /Cancel/i})).toBeInTheDocument();
  });
});
