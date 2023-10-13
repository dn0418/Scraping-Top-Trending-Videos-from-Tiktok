import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth";
import Notfound from "./pages/Notfound";
import Dashboard from "./pages/dashboard";
import { QueryClient, QueryClientProvider } from "react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <GoogleOAuthProvider clientId="744685161545-em893prk331fejvl1q7hfal6cpnek7gt.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/auth/*" element={<Auth />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </Router>
        <Toaster position="bottom-right" />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </RecoilRoot>
);
