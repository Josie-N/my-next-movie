import styles from "../MovieCard/MovieCard.module.css";
import React from "react";

type Props = {
  children: React.ReactNode,
  handleCollapse: () => void
}

export default function MovieCardHidden({ children, handleCollapse }: Props) {
  return (
    <div
      tabIndex={0}
      className={styles.movieCard__collapsed}
      onClick={handleCollapse}
    >
      {children}
    </div>
  )
}
