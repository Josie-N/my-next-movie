import styles from "../MovieCard/MovieCard.module.css";
import React from "react";

type Props = {
  children: React.ReactNode,
  handleCollapse: () => void,
  dataTestID?: string,
}

export function MovieCardHidden({ children, handleCollapse, dataTestID }: Props) {
  return (
    <div
      tabIndex={0}
      className={styles.movieCard__collapsed}
      onClick={handleCollapse}
      data-testid={dataTestID}
    >
      {children}
    </div>
  )
}
