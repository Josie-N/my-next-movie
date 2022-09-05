import React from "react";
import styles from "../../components/Footer/Footer.module.css";


export const Footer = () => {
  return (
    <div className={styles.maxWidthContainer}>
      <footer>
        <ul className={styles.footerList}>
          <li className={styles.footerItem}>
            Using GDPR compliant
            {" "}<a className={styles.footerLink} href="https://usefathom.com/">Fathom</a>{" "}
            for website analytics. No cookies.
          </li>
          <li className={styles.footerItem}>
            <a className={styles.footerLink} href="/">Imprint</a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
