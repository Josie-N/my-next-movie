import React from "react";

import styles from "./MovieListSkeleton.module.css";
import LoadingIndicator from "../../../components/generic/LoadingIndicator/LoadingIndicator";

export default function MovieListSkeleton() {
  return (
    <div className={styles.movieListSkeleton}>
      <LoadingIndicator />
    </div>
  );
}
