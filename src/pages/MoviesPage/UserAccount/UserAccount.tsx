import React, { useState } from "react";

import classNames from "classnames/bind";
import styles from './UserAccount.module.css';
import helperStyles from "../../../assets/stylesheets/helper.module.css";

import { useUsernameStore } from "src/store/store";
import useOutsideClick from "../../../hooks/useOutsideClick";
import UserAccountActions from "../UserAccountActions/UserAccountActions";
import UserAccountIconSwitch from "../UserAccountIconSwitch/UserAccountIconSwitch";

// Rename to: UserAccountMenu
const UserAccount = () => {
  const { username } = useUsernameStore();

  // Rename to: isAccountMenuExpanded
  const [isAccountToggled, setAccountToggled] = useState(false);
  const [isAccountHovered, setAccountHovered] = useState(false);

  const [settings, displaySettings] = useState(true);
  const [account, displayAccount] = useState(false);

  const handleToggleAccount = () => {
    setAccountToggled(!isAccountToggled);
  }

  const handleSettings = () => {
    displaySettings(true);
    displayAccount(false);
  }

  const handleAccount = () => {
    displaySettings(false);
    displayAccount(true);
  }

  // Collapses/opens the user account actions,
  // resets the default action category back to 'Settings',
  // changes the icon next to username back to 'id'
  const handleClickOutside = () => {
    setAccountToggled(false);
    displaySettings(true);
    displayAccount(false);
    setAccountHovered(false);
  }

  const cn = classNames.bind(styles);

  const usernameClassNames = cn(
    'accountUsername',
    { 'accountUsername__active': isAccountToggled }
  );

  const accountContainerClassNames = cn(
    'accountContainer',
    { 'accountContainer__open': isAccountToggled }
  );

  const usernameContainerClassNames = cn(
    'accountUsernameContainer',
    { 'accountUsernameContainer__open': isAccountToggled }
  );

  const elementRef = useOutsideClick(handleClickOutside);

  return (
    <div className={accountContainerClassNames}
         ref={elementRef}
         onMouseEnter={() => setAccountHovered(true)}
         onMouseLeave={() => setAccountHovered(false)}
    >
      <div className={usernameContainerClassNames} onClick={handleToggleAccount}
           role="button" aria-haspopup="menu" aria-expanded={isAccountMenuExpanded} tabIndex={0}
      >
        <h2 className={helperStyles.visuallyHidden}>Username: {username}</h2>
        <h2 className={usernameClassNames} aria-hidden>{username}</h2>
        <UserAccountIconSwitch isAccountToggled={isAccountToggled} isAccountHovered={isAccountHovered} />
      </div>
      {isAccountToggled &&
        <UserAccountActions
          settings={settings}
          account={account}
          handleSettings={handleSettings}
          handleAccount={handleAccount}
        />
      }
    </div>
  )
}

export default UserAccount;
