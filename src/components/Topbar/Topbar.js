import React from "react";
import styles from "../../components/Topbar/Topbar.module.css";
import helperStyles from "../../assets/stylesheets/helper.module.css";
import logo from "../../assets/images/brandHeaderLogo.svg";


export const Topbar = () => {
  return (
    <div className={styles.maxWidthContainer}>
      <header className={styles.header}>
        <h1 className={helperStyles.visuallyHidden}>
          The tale of, a movie search database
        </h1>
        <span>
          <a href="/">
            <img className={styles.brandLogo} src={logo} alt="Brand logo" aria-hidden />
          </a>
        </span>
      </header>
    </div>
  );
}
