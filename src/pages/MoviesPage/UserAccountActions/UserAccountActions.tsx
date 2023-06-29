import React from "react";
import classNames from "classnames/bind";

import styles from "./UserAccountActions.module.css";
import {useNewAccountFormStore} from "../../../store/store";

type Props = {
  settings: boolean,
  account: boolean,
  handleSettings: () => void,
  handleAccount: () => void,
}

enum Actions {
  Change = 'Change name',
  Create = 'Create new',
  DifferentID = 'Use a different Id',
  Delete = 'Delete'
}

export default function UserAccountActions({settings, account, handleSettings, handleAccount}: Props) {
  const showNewAccountForm = useNewAccountFormStore(state => state.showNewAccountForm);

  const cn = classNames.bind(styles);

  const settingsClassNames = cn(
    'actionCategoryLabel',
    {'actionCategoryLabel__active': settings}
  )

  const accountClassNames = cn(
    'actionCategoryLabel',
    {'actionCategoryLabel__active': account}
  )

  return (
    <>
      <nav role="tablist">
        <div className={styles.accountActionCategories}>
          <h3 className={settingsClassNames} onClick={handleSettings} role="tab"
              aria-selected={settings} id="settingsTab" aria-controls="settingsPanel" tabIndex={0}>
            Settings
          </h3>
          <h3 className={accountClassNames} onClick={handleAccount} role="tab"
              aria-selected={account} id="accountTab" aria-controls="accountPanel" tabIndex={0}>
            Account
          </h3>
        </div>
        {settings &&
            <ul className={styles.accountActionList}
                role="tabpanel"
                aria-labelledby="settingsTab" id="settingsPanel" aria-hidden={!settings}>
                <li className={styles.accountActionListItem} tabIndex={0}>{Actions.Change}</li>
            </ul>
        }
        {account &&
            <ul className={styles.accountActionList}
                role="tabpanel" aria-labelledby="accountTab" id="accountPanel" aria-hidden={!account}
            >
                <li className={styles.accountActionListItem} tabIndex={0}
                    onClick={() => showNewAccountForm(true)}>{Actions.Create}</li>
                <li className={styles.accountActionListItem} tabIndex={0}>{Actions.DifferentID}</li>
                <li className={cn('accountActionListItem', 'deleteAccount')} tabIndex={0}>{Actions.Delete}</li>
            </ul>
        }
      </nav>
    </>
  )
}
