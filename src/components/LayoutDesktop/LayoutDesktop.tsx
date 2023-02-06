import React from "react";
import helperStyles from "../../assets/stylesheets/helper.module.css";

type Props = {
  children: React.ReactNode
}

export default function LayoutDesktop({ children }: Props) {
  return (
    <div className={helperStyles.maxWidthDesktop}>
      {children}
    </div>
  );
}
