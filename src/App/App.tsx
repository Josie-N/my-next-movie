import React, { lazy, Suspense } from 'react';
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import DelayedFallback from "../components/generic/DelayedFallback/DelayedFallback";
import ErrorFallback from "../components/ErrorFallback/ErrorFallback";
import Topbar from "../components/Topbar/Topbar";
import styles from "./App.module.css";

const Homepage = lazy(() => import("../pages/MoviesPage/MoviesPage/MoviesPage"));
const Imprint = lazy(() => import("../pages/Imprint/Imprint"));
const Footer = lazy(() => import("../components/Footer/Footer"));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<DelayedFallback />}>
        <Topbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/imprint" element={<Imprint />} />
          <Route path="*" element={<ErrorFallback error={{ message: "404 Page not found" }} />} />
        </Routes>
        <hr className={styles.footerTopBoundary} />
        <Footer />
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
