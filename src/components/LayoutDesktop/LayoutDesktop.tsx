import React from "react";
import helperStyles from "../../assets/stylesheets/helper.module.css";

type Props = {
  children: React.ReactNode
}

const LayoutDesktop = ({ children }: Props) => {
  return (
    <div className={helperStyles.maxWidthDesktop}>
      {children}
    </div>
  );
}

export default LayoutDesktop;