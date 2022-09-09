import React from 'react';
import * as Icon from "react-feather";
import styles from './LinkExternal.module.css';
import PropTypes from "prop-types";

export const LinkExternal = ({ children, path, hasIcon, fontSize }) => {

  const calcSizes = (fontSize) => {
    const baseIconSize = 14;
    const baseStrokeWidth = 1.5;

    switch (fontSize) {
      case 'md':
        return {
          icon: baseIconSize + 3,
          strokeWidth: baseStrokeWidth
        }
      case 'base':
        return {
          icon: baseIconSize + 0.5,
          strokeWidth: baseStrokeWidth
        }
      case 'sm':
        return {
          icon: baseIconSize - 3,
          strokeWidth: baseStrokeWidth + 0.4
        }
      default:
        throw Error('calcSizes error!')
    }
  }

  const resize = calcSizes(fontSize);
  
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
          <Icon.ExternalLink
            strokeWidth={resize.strokeWidth}
            size={resize.icon}
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
  fontSize: PropTypes.oneOf(['sm', 'base', 'md']),
};

LinkExternal.defaultProps = {
  fontSize: 'base',
};
