import React from "react";
import { Link } from "react-router-dom";
import {useNewAccountFormStore, useStore} from "../../store/store";

import styles from "../../components/Topbar/Topbar.module.css";

import logo from "../../assets/images/brandLogo.svg";
import { MovieListType } from "../../constants/constants";
import LayoutDesktop from "../LayoutDesktop/LayoutDesktop";
import { Heading } from "../generic/Heading/Heading";

const Topbar = () => {
  const updateMovieListType = useStore(state => state.changeMovieListType);
  const showNewAccountForm = useNewAccountFormStore(state => state.showNewAccountForm);

  const handleBrandLogo = () => {
    updateMovieListType(MovieListType.Recommended);
    showNewAccountForm(false);
  };

  return (
    <LayoutDesktop>
      <header className={styles.header}>
        <span>
          <Link to="/" onClick={handleBrandLogo}>
            <img className={styles.brandLogo} src={logo} alt="True tale of" />
          </Link>
        </span>
        <Heading dataTestID="accessible heading" level="h1" hideTextVisually>
          The tale of, a movie search database
        </Heading>
      </header>
    </LayoutDesktop>
  );
}

export default Topbar;
