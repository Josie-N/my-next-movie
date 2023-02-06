import React from "react";
import { Link } from "react-router-dom";

import styles from "../../components/Footer/Footer.module.css";

import { LinkExternal } from "../generic/LinkExternal/LinkExternal";
import LayoutDesktop from "../LayoutDesktop/LayoutDesktop";

const Footer = (): JSX.Element => {
  return (
    <LayoutDesktop>
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
              Legal Notice
            </Link>
          </li>
        </ul>
      </footer>
    </LayoutDesktop>
  );
}

export default Footer;
