import React, { useLayoutEffect } from 'react';
import { LinkExternal } from "../../components/generic/LinkExternal/LinkExternal";

import styles from "./Imprint.module.css";
import imprint from "../../assets/images/Imprint.svg";

import * as Icon from 'react-feather';
import LayoutDesktop from "../../components/LayoutDesktop/LayoutDesktop";


const Imprint = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <LayoutDesktop>
      <main className={styles.imprint}>
        <div className={styles.imprintInnerContainer}>
          <h1 className={styles.imprintMainTitle}>Legal Notice</h1>
          <p className={styles.imprintLegalInfo}>According to{" "}
            <LinkExternal ariaLabel="German law: Telemedia Act, Section 5" hasIcon fontSize="sm"
                          path="https://www.gesetze-im-internet.de/tmg/__5.html">
              § 5, Abs. 1, Nr. 1, TMG
            </LinkExternal>
          </p>
          <h2 className={styles.imprintSubtitle}>truetaleof.com is brought to you by:</h2>
          <address>
            <p className={styles.imprintInfo}>Iozefina Nagy</p>
            <p className={styles.imprintInfo}>Prinzregentenstraße 95</p>
            <p className={styles.imprintInfo}>10717 Berlin</p>
            <p className={styles.imprintInfo}>Germany</p>
            <h3 className={styles.contactTitle}>Contact</h3>
            <p className={styles.imprintInfo}>
              Email: {" "}
              <a className={styles.imprintEmailLink}
                 aria-label="Email address"
                 href="mailto:josie@truetaleof.com?subject=Hi Josie!"
                 target="_blank" rel="noopener noreferrer"
              >
                josie@truetaleof.com
              </a>
            </p>
            <div className={styles.imprintSocialIconsContainer}>
              <a className={styles.imprintSocialIcon} href="https://www.linkedin.com/in/josie-nagy/"
                 aria-label="LinkedIn account"
                 target="_blank"
                 rel="noopener noreferrer">
                <Icon.Linkedin strokeWidth={1.2} size={20} color="#1C2735" />
              </a>
              <a className={styles.imprintSocialIcon} href="https://github.com/Josie-N"
                 aria-label="Github account"
                 target="_blank"
                 rel="noopener noreferrer">
                <Icon.GitHub strokeWidth={1.2} size={20} color="#1C2735" />
              </a>
              <a className={styles.imprintSocialIcon} href="https://twitter.com/iozefina_nagy"
                 aria-label="Twitter account"
                 target="_blank"
                 rel="noopener noreferrer">
                <Icon.Twitter strokeWidth={1.2} size={20} color="#1C2735" />
              </a>
            </div>
          </address>
          <h2 className={styles.imprintSubtitle}>Legal disclaimer</h2>
          <p className={styles.imprintLegalDisclaimer}>
            Our web-based application contains links to external websites. As the contents of these
            third-party websites are beyond
            our control, we cannot accept liability for them. Responsibility for the contents of the linked pages is
            always held by the provider or operator of the pages.
          </p>
          <p>All linked pages were checked for possible legal violations at the time of linking. Illegal content was
            not recognizable at the time of linking.</p>
        </div>
        <img className={styles.imprintImage} src={imprint} alt="" />
      </main>
    </LayoutDesktop>
  );
}

export default Imprint;
