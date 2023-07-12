import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {FormCreateUserLogic} from "../FormCreateUserLogic";
import {wrapper} from "../../../../utils/tests/queryClientProviderWrapper";


describe('FormCreateUserLogic', () => {
  describe('username input field', () => {
    const getInputButton = () => {
      const userInput = screen.getByLabelText(/Username/i) as HTMLInputElement;
      return {userInput};
    }

    beforeEach(() => {
      render(<FormCreateUserLogic/>, {wrapper});
    });

    it('should not contain any forbidden characters', () => {
      const {userInput} = getInputButton();

      fireEvent.change(userInput, {target: {value: '!'}});

      expect(screen.getByText(/Some symbols are not allowed:/i)).toBeInTheDocument();
    });

    it('should contain a maximum of 30 characters', () => {
      const {userInput} = getInputButton();

      fireEvent.change(userInput, {target: {value: '123456789123456789123456789123456789'}});

      const inputLength = userInput.value.length;
      expect(inputLength).not.toBeLessThanOrEqual(30);
    });

    it('should contain a minimum of 2 characters', () => {
      const {userInput} = getInputButton();
      fireEvent.change(userInput, {target: {value: '1'}});

      const submitButton = screen.getByRole('button', {name: /create/i});
      fireEvent.click(submitButton);

      expect(screen.getByText(/Your username needs at least 2 characters/i)).toBeInTheDocument();
    });

    it('should not be blank', () => {
      const {userInput} = getInputButton();
      fireEvent.change(userInput, {target: {value: ''}});

      const submitButton = screen.getByRole('button', {name: /create/i});
      fireEvent.click(submitButton);

      expect(screen.getByText(/Please enter a username/i)).toBeInTheDocument();
    });

    it('should not contain only empty spaces', () => {
      const {userInput} = getInputButton();
      fireEvent.change(userInput, {target: {value: '   '}});

      const submitButton = screen.getByRole('button', {name: /create/i});
      fireEvent.click(submitButton);

      expect(screen.getByText(/Please enter a username/i)).toBeInTheDocument();
    });

    it('should be able to contain emojis', () => {
      const {userInput} = getInputButton();
      fireEvent.change(userInput, {target: {value: '👍'}});

      const submitButton = screen.getByRole('button', {name: /create/i});
      fireEvent.click(submitButton);

      expect(screen.queryByText(/Some symbols are not allowed:/i)).not.toBeInTheDocument();
    });

    it('should be able to contain characters with spaces in between them', () => {
      const {userInput} = getInputButton();
      fireEvent.change(userInput, {target: {value: '1   2   3'}});

      const submitButton = screen.getByRole('button', {name: /create/i});
      fireEvent.click(submitButton);

      expect(screen.queryByText(/Your username needs at least 2 characters/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Please enter a username/i)).not.toBeInTheDocument();
    });
  });

  describe('clear/ X button', () => {
    const getInputButton = () => {
      const userInput = screen.getByLabelText(/Username/i) as HTMLInputElement;
      return {userInput};
    }

    beforeEach(() => {
      render(<FormCreateUserLogic/>, {wrapper});
    });

    it('should not be displayed when user input field is blank', () => {
      const {userInput} = getInputButton();
      fireEvent.change(userInput, {target: {value: ''}});

      const clearButton = screen.queryByRole('button', {name: /clear text input/i});
      expect(clearButton).toBeNull();
    });

    it('should be displayed when user types in any character, including whitespace', () => {
      const {userInput} = getInputButton();
      fireEvent.change(userInput, {target: {value: '       '}});

      const clearButton = screen.getByRole('button', {name: /clear text input/i});
      expect(clearButton).toBeInTheDocument();
    });

    it('should clear username input field when pressed', () => {
      const {userInput} = getInputButton();
      fireEvent.change(userInput, {target: {value: 'any random characters'}});

      const clearButton = screen.getByRole('button', {name: /clear text input/i});
      fireEvent.click(clearButton);

      expect(userInput.value).toBe('');
    });
  });

  describe('submit button', () => {
    const getInputAndSubmitButton = () => {
      const userInput = screen.getByLabelText(/Username/i);
      const submitButton = screen.getByRole('button', {name: /create/i});
      return {userInput, submitButton};
    };

    beforeEach(() => {
      render(<FormCreateUserLogic/>, {wrapper});
    });

    describe('before pressing', () => {
      it('should be enabled when user types in any character', () => {
        const {userInput, submitButton} = getInputAndSubmitButton();

        fireEvent.change(userInput, {target: {value: 'any random characters'}});

        expect(submitButton).not.toHaveAttribute('disabled');
        expect(submitButton).toBeEnabled();
      });

      it('should be disabled when user input field contains special characters', () => {
        const {userInput, submitButton} = getInputAndSubmitButton();

        fireEvent.change(userInput, {target: {value: '!'}});

        expect(submitButton).toHaveAttribute('disabled');
        expect(submitButton).toBeDisabled();
      });
    });

    describe('after pressing', () => {
      it("should be disabled when user input field is blank", () => {
        const {userInput, submitButton} = getInputAndSubmitButton();

        fireEvent.change(userInput, {target: {value: ''}});
        fireEvent.click(submitButton);

        expect(submitButton).toHaveAttribute('disabled');
        expect(submitButton).toBeDisabled();
      });

      it("should be disabled when user input field has less than 2 characters", () => {
        const {userInput, submitButton} = getInputAndSubmitButton();

        fireEvent.change(userInput, {target: {value: '1'}});
        fireEvent.click(submitButton);

        expect(submitButton).toHaveAttribute('disabled');
        expect(submitButton).toBeDisabled();
      });
    });
  });

  describe('cancel button', () => {
    it('should always be enabled, no matter what is typed into the input field', () => {
      render(<FormCreateUserLogic/>, {wrapper});

      const userInput = screen.getByLabelText(/Username/i);
      const cancelButton = screen.getByRole('button', {name: /cancel/i});

      fireEvent.change(userInput, {target: {value: '!'}});

      expect(cancelButton).not.toHaveAttribute('disabled');
      expect(cancelButton).toBeEnabled();
    });
  });
});
