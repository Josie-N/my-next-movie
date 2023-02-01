import React from "react";
import { Headings } from "src/constants/headings";
import styles from "./UserAccountActions.module.css";

type Props = {
  settings: boolean,
  account: boolean,
  handleSettings: () => void,
  handleAccount: () => void
}

export default function UserAccountActions({ settings, account, handleSettings, handleAccount }: Props) {

  return (
    <>
      <div className={styles.accountActionCategories}>
        <h3 className={styles.actionCategoryLabel} onClick={handleSettings}>{Headings.H3.MoviesPage.Settings}</h3>
        <h3 className={styles.actionCategoryLabel} onClick={handleAccount}>{Headings.H3.MoviesPage.Account}</h3>
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
  )
}
