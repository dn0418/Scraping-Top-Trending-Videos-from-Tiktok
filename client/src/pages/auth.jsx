import React from "react";
import AuthHeader from "../components/headers/auth";
import LoginForm from "../components/forms/auth/LoginForm";
import { Route, Routes } from "react-router-dom";
import RegisterForm from "../components/forms/auth/RegisterForm";
import Notfound from "./Notfound";
import { useGoogleLogin } from "@react-oauth/google";

const Auth = () => {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });
  return (
    <>
      <AuthHeader />
      <div className="bg-gray-50 py-6">
        <div className="flex items-center justify-center h-full">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Auth;
