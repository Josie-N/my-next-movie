import React from "react";
import { Link } from "react-router-dom";
import { LinkExternal } from "../generic/LinkExternal/LinkExternal";

import styles from "../../components/Footer/Footer.module.css";
import helperStyles from "../../assets/stylesheets/helper.module.css";


export const Footer = () => {
  return (
    <div className={helperStyles.maxWidthDesktop}>
      <footer>
        <ul className={styles.footerList}>
          <li className={styles.footerItem}>
            Using GDPR compliant{" "}
            <LinkExternal fontSize="sm" path="https://usefathom.com/" hasIcon>
              Fathom
            </LinkExternal>
            for website analytics. No cookies.
          </li>
          <li className={styles.footerItem}>
            <Link className={styles.footerLink} to="/imprint">
              Imprint
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}
