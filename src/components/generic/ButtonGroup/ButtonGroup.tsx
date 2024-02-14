import React from 'react';
import styles from "./ButtonGroup.module.css";
import classNames from "classnames/bind";

interface ButtonGroupProps {
    children: React.ReactNode,
    role: 'primary' | 'secondary',
    movieId?: string,
    // TO DO: Review these types
    buttonActivationSettings: {
      onButtonMouseEnter?: (role: string) => void,
      onButtonMouseLeave?: (role: string) => void,
      onPrimaryButtonClick: () => void,
    }
}

function ButtonGroup({children, role, movieId, buttonActivationSettings}: ButtonGroupProps) {
  const cn = classNames.bind(styles);
  const buttonStyle = cn({
    "contained": role === "primary",
    "contained-secondary": role === "secondary"
  });

  const buttonGroupStyle = cn({
        "buttonGroup__primary": role === "primary",
        "buttonGroup__secondary": role === "secondary"
  });

    // Clone each child element and pass additional props to them
    const childrenWithProps = React.Children.map(
      children,
      child => {
          return React.cloneElement(
            child as React.ReactElement<any>,
            { role, movieId, buttonStyle, buttonActivationSettings }
          );
      }
    );

    return <div className={buttonGroupStyle}>{childrenWithProps}</div>;
}

export default ButtonGroup;
