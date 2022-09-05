import React, { Component } from "react";
import MoviesPage from "../views/Movies/MoviesPage";
import { Footer } from "../components/Footer/Footer";

import styles from './App.module.css';

class App extends Component {
  render () {
    return (
      <div className={styles.layoutContainer}>
        <MoviesPage />
        <hr className={styles.footerTopBoundary} />
        <Footer />
      </div>
    );
  }
}

export default App;
