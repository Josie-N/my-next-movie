import React, { useState } from "react";

import styles from './UserAccount.module.css';

import { useUsernameStore } from "../../../store/store";
import useOutsideClick from "../../../hooks/useOutsideClick";

// TO DO: username should not break into next line
// TO DO: add ellipsis to username

// I want a copy feature that I can turn on or off with a prop
// const handleCopyToClipboard = () => navigator.clipboard.writeText(username);
// const icon = <Icon.Copy strokeWidth={1.8} size={20} color="#1C2735" />


const UserAccount = () => {
  const { username } = useUsernameStore();

  const [toggleAccount, setToggleAccount] = useState(false);

  const [settings, displaySettings] = useState(true);
  const [account, displayAccount] = useState(false);

  const handleToggleAccount = () => {
    setToggleAccount(!toggleAccount);
  }

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
        <div className={styles.idChip}>Id</div>
        <h2 className={styles.accountUsername} aria-label="Username" onClick={handleToggleAccount}>
          {username}
          {/*really long username that doesn't fit*/}
        </h2>
      </div>
      {toggleAccount ?
        <>
          <div className={styles.accountCategories}>
            <h3 className={styles.categoryLabel} onClick={handleSettings}>Settings</h3>
            <h3 className={styles.categoryLabel} onClick={handleAccount}>Account</h3>
          </div>
          <ul>
            {settings && <li>Change name</li>}
            {account &&
              <>
                <li>Create new</li>
                <li>Use a different Id</li>
                <li>Delete</li>
              </>
            }
          </ul>
        </>
        : null
      }
    </div>
  )
}

export default UserAccount;
