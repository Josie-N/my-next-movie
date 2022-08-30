import React, { Component } from "react";
import MoviesPage from "../views/Movies/MoviesPage";

import styles from './App.module.css';

class App extends Component {
  render () {
    return (
      <div className={styles.layoutContainer}>
        <MoviesPage />
      </div>
    );
  }
}

export default App;
