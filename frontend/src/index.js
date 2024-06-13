import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import RouteList from "./router";
import { SnackbarProvider } from "notistack";
import { AuthProvider } from "./AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {},
});

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <AuthProvider>
      <SnackbarProvider>
        <QueryClientProvider client={queryClient}>
          <RouteList />
        </QueryClientProvider>
      </SnackbarProvider>
    </AuthProvider>
  </React.StrictMode>
);
