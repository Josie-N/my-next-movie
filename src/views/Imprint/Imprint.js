import React from 'react';
import styles from "./Imprint.module.css";
import helperStyles from "../../assets/stylesheets/helper.module.css";
import imprint from "../../assets/images/Imprint.svg";
import * as Icon from 'react-feather';


export const Imprint = () => {

  return (
    <div className={helperStyles.maxWidthDesktop}>
      <div className={styles.imprint}>
        <div className={styles.imprintInnerContainer}>
          <h1 className={styles.imprintMainTitle}>Imprint</h1>
          <p className={styles.imprintLegalInfo}>According to{" "}
            <a className={styles.imprintLegalLink}
               href="https://www.gesetze-im-internet.de/tmg/__5.html"
               target="_blank" rel="noopener noreferrer"
            >
              § 5, Abs. 1, Nr. 1, TMG
            </a>{" "}
            <span className={styles.imprintRedirectIcon}>
              <Icon.ExternalLink strokeWidth={1.5} size={14} color="#1C2735" />
            </span>
          </p>
          <address>
            <h4 className={styles.imprintInfo}>Owner: Iozefina Nagy</h4>
            <p className={styles.imprintInfo}>Prinzregentenstraße 95</p>
            <p className={styles.imprintInfo}>10717 Berlin</p>
            <p className={styles.imprintInfo}>Germany</p>
            <p className={styles.imprintInfo}>
              <a className={styles.imprintEmailLink}
                 href="mailto:josie@truetaleof.com?subject=Hi Josie!"
                 target="_blank" rel="noopener noreferrer"
              >
                josie@truetaleof.com
              </a>
            </p>
            <div className={styles.imprintSocialIconsContainer}>
              <a href="https://www.linkedin.com/in/josie-nagy/" target="_blank" rel="noopener noreferrer">
                <Icon.Linkedin className={styles.imprintSocialIcon} strokeWidth={1.1} size={24} color="#1C2735" />
              </a>
              <a href="https://github.com/Josie-N" target="_blank" rel="noopener noreferrer">
                <Icon.GitHub className={styles.imprintSocialIcon} strokeWidth={1.1} size={23} color="#1C2735" />
              </a>
              <a href="https://twitter.com/iozefina_nagy" target="_blank" rel="noopener noreferrer">
                <Icon.Twitter className={styles.imprintSocialIcon} strokeWidth={1.1} size={23} color="#1C2735" />
              </a>
            </div>
          </address>
        </div>
        <img className={styles.imprintImage} src={imprint} alt="" />
      </div>
    </div>
  );
}