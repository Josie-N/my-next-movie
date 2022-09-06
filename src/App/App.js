import React, { Component } from "react";
import { Topbar } from "../components/Topbar/Topbar";
import { Homepage } from "../views/Homepage/Homepage";
import { Footer } from "../components/Footer/Footer";

import styles from './App.module.css';

class App extends Component {
  render () {
    return (
      <div>
        <Topbar />
        <Homepage />
        <hr className={styles.footerTopBoundary} />
        <Footer />
      </div>
    );
  }
}

export default App;
