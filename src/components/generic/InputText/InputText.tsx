import React, {useState} from "react";
import styles from "./InputText.module.css";
import classNames from "classnames/bind";

import x from "../../../assets/icons/x.svg";
import Button from "../Button/Button";


type Props = {
  textLabel: string,
  isClearable?: boolean,
  hasCharacterCounter?: boolean,
  hasInputValidation?: boolean,
  maxLength?: number,
  onTextInput?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onClearTextInput?: () => void,
  hasError?: boolean
}

export function InputText({
                            isClearable = false,
                            hasCharacterCounter = false,
                            hasInputValidation = false,
                            maxLength,
                            textLabel,
                            onTextInput,
                            onClearTextInput,
                            hasError = false
                          }: Props) {

  const [inputText, setInputText] = useState('');
  const [showCharacterLimit, setShowCharacterLimit] = useState(false);

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    setShowCharacterLimit(e.target.value.length > 0);
    if (onTextInput) onTextInput(e);
  }

  const handleClearTextInput = () => {
    setInputText('');
    setShowCharacterLimit(false);
    if (onClearTextInput) onClearTextInput();
  }

  const cn = classNames.bind(styles);
  const inputTextClassNames = cn('inputText', {'inputText__error': hasError});

  return (
    <div className={styles.inputContainer}>
      <input type="text" value={inputText} onChange={handleTextInput}
             maxLength={maxLength}
             autoCorrect="off" autoComplete="off" spellCheck={false}
             name={textLabel} id={textLabel}
             className={inputTextClassNames}
      />
      <label htmlFor={textLabel} className={inputText && styles.filledInput}>{textLabel}</label>
      <span className={styles.clearInput}>
      {isClearable && inputText ?
        <Button variant="base" type="reset" handleButtonClick={handleClearTextInput}>
          <img alt='Reset text input' src={x}/>
        </Button> : null
      }
      </span>
      {hasCharacterCounter && showCharacterLimit ?
        <div className={styles.characterLimit}>
          <span className={styles.characterCount}>{inputText.length}</span>
          <span className={styles.characterCount}>/</span>
          <span>{maxLength}</span>
        </div> : null
      }
    </div>
  );
}
