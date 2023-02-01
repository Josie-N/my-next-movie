import React, { useState } from "react";

import styles from './UserAccount.module.css';

import { useUsernameStore } from "../../../store/store";
import useOutsideClick from "../../../hooks/useOutsideClick";
import IconId from "src/components/generic/IconId/IconId";
import UserAccountActions from "../UserAccountActions/UserAccountActions";


const UserAccount = () => {
  const { username } = useUsernameStore();

  const [toggleAccount, setToggleAccount] = useState(false);
  const [settings, displaySettings] = useState(true);
  const [account, displayAccount] = useState(false);

  const handleToggleAccount = () => setToggleAccount(!toggleAccount);

  const handleSettings = () => {
    displaySettings(true);
    displayAccount(false);
  }

  const handleAccount = () => {
    displaySettings(false);
    displayAccount(true);
  }

  const handleClickOutside = () => {
    setToggleAccount(false);
    displaySettings(true);
    displayAccount(false);
  }
  
  const elementRef = useOutsideClick(handleClickOutside);

  return (
    <div className={styles.accountContainer} ref={elementRef}>
      <div className={styles.accountUsernameContainer}>
        <h2 className={styles.accountUsername} aria-label="Username id" onClick={handleToggleAccount}>
          {username}
        </h2>
        <IconId />
      </div>
      {toggleAccount ?
        <UserAccountActions
          settings={settings}
          account={account}
          handleSettings={handleSettings}
          handleAccount={handleAccount}
        />
        :
        null
      }
    </div>
  )
}

export default UserAccount;
