import React from "react";
import { Link } from "react-router-dom";

import { useMovieListType } from "../../store/store";
import { RECOMMENDED } from "../../constants/constants";

import styles from "../../components/Topbar/Topbar.module.css";
import helperStyles from "../../assets/stylesheets/helper.module.css";
import logo from "../../assets/images/brandLogo.svg";

export const Topbar = () => {
  const updateMovieListType = useMovieListType(state => state.changeMovieListType);

  return (
    <div className={helperStyles.maxWidthDesktop}>
      <header className={styles.header}>
        <span>
          <Link to="/" onClick={() => updateMovieListType(RECOMMENDED)}>
            <img className={styles.brandLogo} src={logo} alt="True tale of" />
          </Link>
        </span>
        <h1 className={helperStyles.visuallyHidden}>
          The tale of, a movie search database
        </h1>
      </header>
    </div>
  );
}
