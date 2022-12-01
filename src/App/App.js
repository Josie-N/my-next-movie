import React, { lazy, Suspense } from 'react';
import { Route, Routes } from "react-router-dom";

import DelayedFallback from "../components/generic/DelayedFallback/DelayedFallback";
import { Topbar } from "../components/Topbar/Topbar";
import styles from "./App.module.css";

const HomepageContainer = lazy(() => import("../views/Homepage/HomepageContainer"));
const Imprint = lazy(() => import("../views/Imprint/Imprint"));
const Footer = lazy(() => import("../components/Footer/Footer"));

function App () {
  return (
    <Suspense fallback={<DelayedFallback />}>
      <Topbar />
      <Routes>
        <Route exact path="/" element={<HomepageContainer />} />
        <Route path="/imprint" element={<Imprint />} />
        <Route path="*" element={<h1>404 Page not found</h1>} />
      </Routes>
      <hr className={styles.footerTopBoundary} />
      <Footer />
    </Suspense>
  );
}

export default App;
