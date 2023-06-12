import React, { useState } from "react";

import classNames from "classnames/bind";
import styles from './UserAccountMenu.module.css';

import { useUsernameStore } from "src/store/store";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { Heading } from "src/components/generic/Heading/Heading";
import UserAccountActions from "../UserAccountActions/UserAccountActions";
import UserAccountIconSwitch from "../UserAccountIconSwitch/UserAccountIconSwitch";


const UserAccountMenu = () => {
  const { username } = useUsernameStore();

  const [isAccountMenuExpanded, setAccountMenuExpanded] = useState(false);
  const [isAccountHovered, setAccountHovered] = useState(false);

  const [settings, displaySettings] = useState(true);
  const [account, displayAccount] = useState(false);

  const handleToggleAccount = () => {
    setAccountMenuExpanded(!isAccountMenuExpanded);
  }

  const handleSettings = () => {
    displaySettings(true);
    displayAccount(false);
  }

  const handleAccount = () => {
    displaySettings(false);
    displayAccount(true);
  }

  // Collapses/expands the user account menu,
  // resets the default menu action category back to 'Settings',
  // changes the icon next to username back to 'id'
  const handleClickOutside = () => {
    setAccountMenuExpanded(false);
    displaySettings(true);
    displayAccount(false);
    setAccountHovered(false);
  }

  const cn = classNames.bind(styles);

  const usernameClassNames = cn(
    'accountUsername',
    { 'accountUsername__active': isAccountMenuExpanded }
  );

  const accountContainerClassNames = cn(
    'accountContainer',
    { 'accountContainer__open': isAccountMenuExpanded }
  );

  const usernameContainerClassNames = cn(
    'accountUsernameContainer',
    { 'accountUsernameContainer__open': isAccountMenuExpanded }
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
        <Heading level="h2" hideTextVisually>Username:{username}</Heading>
        <Heading level="h2" hideFromScreenReader styling={usernameClassNames}>{username}</Heading>
        <UserAccountIconSwitch isAccountMenuExpanded={isAccountMenuExpanded} isAccountHovered={isAccountHovered} />
      </div>
      {isAccountMenuExpanded &&
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

export default UserAccountMenu;
