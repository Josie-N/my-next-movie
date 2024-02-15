import React from 'react';
import classNames from "classnames/bind";

import styles from './ButtonIcon.module.css';

interface Props {
  icon: string,
  isIconBold?: boolean,
}

export function ButtonIcon({icon, isIconBold} : Props) {
  const cn = classNames.bind(styles);
  const buttonIconClassnames = cn(
    {'buttonIconMedium': !isIconBold},
    {'buttonIconBold' : isIconBold}
  );

  return (
    <span className={buttonIconClassnames}>{icon}</span>
  );
}
