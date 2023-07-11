import React, {useState} from "react";
import {useNewAccountFormStore, useUsernameStore} from "../../../store/store";
import {getRemoveWhitespace} from "./utils/helper";
import {useInvalidateQueries} from "../../../hooks/useInvalidateAllQueries";
import {FormCreateUserView} from "../FormCreateUserView/FormCreateUserView";

export function FormCreateUserLogic() {
  const invalidateQueries = useInvalidateQueries();

  const showNewAccountForm = useNewAccountFormStore(state => state.showNewAccountForm);
  const {setUsername} = useUsernameStore();

  const [errorMsgOnSubmit, changeSubmitErrorMsg] = useState('');
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

  const checkForbiddenCharacters = (value: string) => {
    const forbiddenCharacters = "( ) ' - _ . ! * ~";

    // Regex pattern that matches all occurrences of these characters in a string
    const detectForbiddenCharacters = /[-_.!~*'()]/g;
    // Check if the value contains specific characters, returns true or false
    const hasForbiddenCharacters = detectForbiddenCharacters.test(value);

    if (hasForbiddenCharacters) {
      setIsSubmitButtonDisabled(true);
      changeSubmitErrorMsg(`Some symbols are not allowed: ${forbiddenCharacters}`);
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

    // Access the input text value from the event object
    // TO DO: Clean this up
    // TO DO: What is the difference between event.target and event.currentTarget?
    // TO DO: Write some comments explaining what in the world is happening here
    const formElement = event.currentTarget;
    const inputElement = formElement.elements.namedItem("Username") as HTMLInputElement;
    // console.log('typeof event.target', typeof event.target);
    // const inputElement = formElement as HTMLButtonElement;
    // console.log('typeof formElement', typeof formElement);
    // console.log('typeof formElement[0]', typeof formElement[0]);
    //
    // for (let i = 0; i < formElement.elements.length; i++) {
    //   console.log(formElement.elements[i].tagName, formElement.elements[i].id);
    // }

    const inputValue = inputElement.value;

    // Format the input text to remove any whitespace
    const stringWithNoTrailingOrLeadingSpaces = getRemoveWhitespace(inputValue);

    // Validation conditions
    const isInputEmpty = stringWithNoTrailingOrLeadingSpaces === '';
    const isInputTooShort = stringWithNoTrailingOrLeadingSpaces.length < 2;

    // No characters typed into the input field
    if (isInputEmpty) {
      setIsSubmitButtonDisabled(true);
      changeSubmitErrorMsg('Please enter a username.');
      return;
    }

    // Only 1 character typed into the input field
    if (isInputTooShort) {
      setIsSubmitButtonDisabled(true);
      changeSubmitErrorMsg('Your username needs at least 2 characters.');
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
