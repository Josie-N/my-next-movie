import React, { Component } from "react";
import MoviesPage from "../views/Movies/MoviesPage";
import { Topbar } from "../components/Topbar/Topbar";
import { Footer } from "../components/Footer/Footer";

import styles from './App.module.css';

class App extends Component {
  render () {
    return (
      <div>
        <Topbar />
        <MoviesPage />
        <hr className={styles.footerTopBoundary} />
        <Footer />
      </div>
    );
  }
}

export default App;
