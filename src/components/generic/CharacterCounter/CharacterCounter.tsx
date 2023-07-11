import React from "react";
import styles from "./CharacterCounter.module.css";

interface characterCounterProps {
  maxCharacterLength: number,
  inputTextLength: number
}

export function CharacterCounter({maxCharacterLength, inputTextLength} : characterCounterProps) {
  const characterCount = maxCharacterLength - inputTextLength;

  return (
    <div
      aria-live="polite"
      aria-label={`You have ${characterCount} characters remaining`}
      className={styles.characterLimit}
    >
      <span className={styles.characterCount}>{inputTextLength}</span>
      <span className={styles.characterCount}>/</span>
      <span>{maxCharacterLength}</span>
    </div>
  );
}
