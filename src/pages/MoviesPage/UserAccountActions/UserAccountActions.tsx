import React from "react";
import classNames from "classnames/bind";

import styles from "./UserAccountActions.module.css";

type Props = {
  settings: boolean,
  account: boolean,
  handleSettings: () => void,
  handleAccount: () => void
}

export default function UserAccountActions({ settings, account, handleSettings, handleAccount }: Props) {
  const cn = classNames.bind(styles);

  const settingsClassNames = cn(
    'actionCategoryLabel',
    { 'actionCategoryLabel__active': settings }
  )

  const accountClassNames = cn(
    'actionCategoryLabel',
    { 'actionCategoryLabel__active': account }
  )

  return (
    <>
      <nav role="tablist">
        <div className={styles.accountActionCategories}>
          <h3 className={settingsClassNames} onClick={handleSettings}
              role="tab" aria-selected={settings} id="settingsTab" aria-controls="settingsPanel" tabIndex={0}
          >
            Settings
          </h3>
          <h3 className={accountClassNames} onClick={handleAccount}
              role="tab" aria-selected={account} id="accountTab" aria-controls="accountPanel" tabIndex={0}
          >
            Account
          </h3>
        </div>
        {/*Not sure whether I should merge back into one <ul/> or not*/}
        {/*Do I really need aria-hidden here?*/}
        {settings &&
          <ul aria-hidden={!settings} id="settingsPanel" aria-labelledby="settingsTab"
              role="tabpanel"
              className={styles.accountActionList}
          >
            <li className={styles.accountActionListItem} tabIndex={0}>Change name</li>
          </ul>
        }
        {account &&
          <ul aria-hidden={!account} id="accountPanel" aria-labelledby="accountTab"
              role="tabpanel"
              className={styles.accountActionList}
          >
            <li className={styles.accountActionListItem} tabIndex={0}>Create new</li>
            <li className={styles.accountActionListItem} tabIndex={0}>Use a different Id</li>
            <li className={cn('accountActionListItem', 'deleteAccount')} tabIndex={0}>Delete</li>
          </ul>
        }
      </nav>
    </>
  )
}

// Last workable solution, with only one ul
//
// <ul role="tabpanel" className={styles.accountActionList}>
//   {settings && <li className={styles.accountActionListItem} tabIndex={0}>Change name</li>}
//   {account &&
//     <>
//      <li className={styles.accountActionListItem} tabIndex={0}>Create new</li>
//      <li className={styles.accountActionListItem} tabIndex={0}>Use a different Id</li>
//       <li className={cn('accountActionListItem', 'deleteAccount')} tabIndex={0}>Delete</li>
//     </>
//   }
// </ul>
