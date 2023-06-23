import React from "react";
import {QueryClient, QueryClientProvider} from "react-query";

//   Provides a custom wrapper for components that need to use QueryClientProvider
//   Allows the components to perform data querying using different react-query hooks

//   Use it when you get this error in your RTL tests:
//   Error: Uncaught [Error: No QueryClient set, use QueryClientProvider to set one]

const queryClient = new QueryClient();
export const wrapper = ({children}: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);
