import React from "react";

import styles from "../UserAccountIconSwitch/UserAccountIconSwitch.module.css";

import chevronUp from "../../../assets/icons/chevronUp.svg";
import chevronDown from "../../../assets/icons/chevronDown.svg";

type Props = {
  isAccountToggled: boolean,
  isAccountHovered: boolean
}

// Rename to: UserAccountIcon
export default function UserAccountIconSwitch({ isAccountToggled, isAccountHovered }: Props) {
  if (isAccountToggled) {
    return <img src={chevronUp} className={styles.dropdownIcon} alt="Close account options" />
  }
  if (isAccountHovered) {
    return <img src={chevronDown} className={styles.dropdownIcon} alt="Open account options" />
  }
  return <span className={styles.idIcon}>id</span>
}
