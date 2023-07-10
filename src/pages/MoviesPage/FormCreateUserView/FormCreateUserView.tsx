import React from "react";
import {useNewAccountFormStore} from "../../../store/store";
import styles from "../FormCreateUserView/FormCreateUserView.module.css";
import {ButtonLabel} from "../../../constants/constants";
import {Heading} from "../../../components/generic/Heading/Heading";
import {BadgeAlert} from "../../../components/generic/BadgeAlert/BadgeAlert";
import {InputText} from "../../../components/generic/InputText/InputText";
import Button from "../../../components/generic/Button/Button";

interface FormCreateUserViewProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  handleTextInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleClearTextInput: () => void,
  isSubmitButtonDisabled: boolean,
  errorMsgOnSubmit: string
}

export function FormCreateUserView({
                       handleSubmit,
                       handleTextInput,
                       handleClearTextInput,
                       isSubmitButtonDisabled,
                       errorMsgOnSubmit
                     }: FormCreateUserViewProps) {
  const showNewAccountForm = useNewAccountFormStore(state => state.showNewAccountForm);

  return (
    <div className={styles.createNewAccountContainer}>
      <Heading styling={styles.mainHeader} level="h2">Create new account</Heading>
      {errorMsgOnSubmit && <BadgeAlert textMessage={errorMsgOnSubmit}/>}
      <form onSubmit={handleSubmit} aria-label="Create new user form">
        <InputText
          textLabel="Username"
          maxLength={30}
          isClearable
          hasCharacterCounter
          hasInputValidation
          onTextInput={handleTextInput}
          onClearTextInput={handleClearTextInput}
          hasError={isSubmitButtonDisabled}
        />
        <div className={styles.primaryActionsButtonContainer}>
          <Button variant="text" type="button" handleButtonClick={() => showNewAccountForm(false)}>
            {ButtonLabel.Cancel}
          </Button>
          <Button isButtonDisabled={isSubmitButtonDisabled} variant="contained" type="submit">
            {ButtonLabel.Create}
          </Button>
        </div>
      </form>
    </div>
  );
}
