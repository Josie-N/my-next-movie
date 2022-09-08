import React from 'react';
import * as Icon from "react-feather";
import styles from './LinkExternal.module.css';
import PropTypes from "prop-types";

export const LinkExternal = ({ children, path, hasIcon, fontSize }) => {

  const IconResize = (fontSize) => {
    let iconSize = 14;

    switch (fontSize) {
      case 'md':
        return iconSize = iconSize + 3;
      case 'base':
        return iconSize = iconSize + 0.5;
      default:
        return iconSize;
    }
  }

  return (
    <>
      <a style={{ fontSize: `var(--font-size-${fontSize})` }}
         className={styles.linkExternal}
         href={path}
         target="_blank" rel="noopener noreferrer"
      >
        {children}
      </a>
      {hasIcon &&
        <span className={styles.imprintRedirectIcon}>
          {" "}
          <Icon.ExternalLink
            strokeWidth={1.5}
            size={IconResize(fontSize)}
            color={`var(--text-color-gunmetal)`}
          />
          {" "}
        </span>
      }
    </>
  );
}

LinkExternal.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
  hasIcon: PropTypes.bool,
  fontSize: PropTypes.string
};

LinkExternal.defaultProps = {
  fontSize: 'base',
};
