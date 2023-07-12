import React from "react";
import styles from "./ButtonClearInput.module.css";
import Button from "../Button/Button";
import x from "../../../assets/icons/x.svg";

interface buttonClearInputProps {
  ariaTextLabel?: string,
  handleClearInput: () => void,
  clearIcon?: string
}

export function ButtonClearInput({ariaTextLabel, handleClearInput, clearIcon} : buttonClearInputProps) {
  return (
    <span className={styles.clearInput}>
      <Button ariaLabel={ariaTextLabel} variant="base" type="reset" handleButtonClick={handleClearInput}>
        <img alt='' src={clearIcon ? clearIcon : x}/>
      </Button>
    </span>
  );
}
