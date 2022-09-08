import React from "react";
import { Route, Routes } from "react-router-dom";

import { Homepage } from "../views/Homepage/Homepage";
import { Topbar } from "../components/Topbar/Topbar";
import { Footer } from "../components/Footer/Footer";
import { Imprint } from "../views/Imprint/Imprint";

import styles from "./App.module.css";


function App () {
  return (
    <>
      <Topbar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/imprint" element={<Imprint />} />
        <Route path="*" element={<h1>404 Page not found</h1>} />
      </Routes>
      <hr className={styles.footerTopBoundary} />
      <Footer />
    </>
  );
}

export default App;
