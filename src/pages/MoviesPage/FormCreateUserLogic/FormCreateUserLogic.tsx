import React, {useState} from "react";
import {useNewAccountFormStore, useUsernameStore} from "../../../store/store";
import {getRemoveWhitespace} from "./utils/helper";
import {useInvalidateQueries} from "../../../hooks/useInvalidateAllQueries";
import {FormCreateUserView} from "../FormCreateUserView/FormCreateUserView";
import {FormErrorMessage} from "../../../constants/formErrorMessages";

export function FormCreateUserLogic() {
  const invalidateQueries = useInvalidateQueries();

  const showNewAccountForm = useNewAccountFormStore(state => state.showNewAccountForm);
  const {setUsername} = useUsernameStore();

  const [errorMsgOnSubmit, changeSubmitErrorMsg] = useState('');
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

  const checkForbiddenCharacters = (value: string) => {
    // Regex pattern that matches all occurrences of characters in a string
    const detectForbiddenCharacters = /[-_.!~*'()]/g;

    // Check if the value contains specific characters, returns true or false
    const hasForbiddenCharacters = detectForbiddenCharacters.test(value);

    if (hasForbiddenCharacters) {
      setIsSubmitButtonDisabled(true);
      changeSubmitErrorMsg(FormErrorMessage.symbolsNotAllowed);
      return;
    }

    setIsSubmitButtonDisabled(false);
    changeSubmitErrorMsg('');
  }

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setIsSubmitButtonDisabled(false);
      changeSubmitErrorMsg('');
      return;
    }

    checkForbiddenCharacters(e.target.value);
  }

  const handleClearTextInput = () => {
    setIsSubmitButtonDisabled(false);
    changeSubmitErrorMsg('');
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // Stop the default action of the browser, handle the event with JavaScript instead
    event.preventDefault();

    // Returns the element that the event listener (onSubmit) is attached to
    const formElement = event.currentTarget;

    // formElement.elements: returns all elements within the form, including input elements and buttons
    // formElement.elements.namedItem: searches for an element with the name attribute equal to "Username" within the form's elements
    const inputElement = formElement.elements.namedItem("Username") as HTMLInputElement;

    // Access to the value of the input field
    const inputValue = inputElement.value;

    // Format the input text to remove any whitespace
    const stringWithNoTrailingOrLeadingSpaces = getRemoveWhitespace(inputValue);

    // Validation conditions
    const isInputEmpty = stringWithNoTrailingOrLeadingSpaces === '';
    const isInputTooShort = stringWithNoTrailingOrLeadingSpaces.length < 2;

    // No characters typed into the input field
    if (isInputEmpty) {
      setIsSubmitButtonDisabled(true);
      changeSubmitErrorMsg(FormErrorMessage.emptyField);
      return;
    }

    // Only 1 character typed into the input field
    if (isInputTooShort) {
      setIsSubmitButtonDisabled(true);
      changeSubmitErrorMsg(FormErrorMessage.usernameTooShort);
      return;
    }

    // If the input field is valid, set the new username
    showNewAccountForm(false);
    setUsername(stringWithNoTrailingOrLeadingSpaces);

    // Invalidate queries (data) that belong to the old username
    invalidateQueries(['list-recommended', 'username', 'list-added', 'list-rejected']);
  }

  return (
    <FormCreateUserView
      handleSubmit={handleSubmit}
      handleTextInput={handleTextInput}
      handleClearTextInput={handleClearTextInput}
      isSubmitButtonDisabled={isSubmitButtonDisabled}
      errorMsgOnSubmit={errorMsgOnSubmit}
    />
  );
}
