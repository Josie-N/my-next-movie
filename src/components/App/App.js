import React, { Component } from "react";
import Movies from "../Movies/Movies";

import styles from './App.module.css';

class App extends Component {
  render () {
    return (
      <div className={styles.layoutContainer}>
        <Movies />
      </div>
    );
  }
}

export default App;
