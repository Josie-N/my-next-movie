import React from 'react';
import * as Icon from "react-feather";
import styles from './LinkExternal.module.css';

interface LinkExternalProps {
    children: React.ReactNode,
    path: string,
    hasIcon?: boolean,
    fontSize: "sm" | "base" | "md"
}

export const LinkExternal = ({children, path, hasIcon, fontSize = 'base'}: LinkExternalProps): JSX.Element => {

    interface calcSizesReturn {
        icon: number,
        strokeWidth: number
    }

    // Can be moved to a helper function
    const calcSizes = (fontSize: string): calcSizesReturn => {
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
            <a style={{fontSize: `var(--font-size-${fontSize})`}}
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

