// src/containers/AuthContainer.js
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import AuthService from "../Services/AuthService";
import LoginForm from "../Components/LogIn";
import RegisterForm from "../Components/Register";
import LogoutButton from "../Components/Logout";

export default function AuthContainer({ onAuthenticated }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authService = new AuthService();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        let isValid = await authService.verifyToken();
        setIsLoggedIn(isValid);
        onAuthenticated(isValid);
      }
      catch (error) {
        console.error("Token login failed:", error);
      }
    };

    checkAuthentication();
  }, []);

  const handleLogin = async (username, password) => {
    try {
      await authService.login(username, password)
      setIsLoggedIn(true);
      onAuthenticated(isLoggedIn);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegister = async (username, password) => {
    try {
      await authService.register(username, password)
      setIsLoggedIn(true);
      onAuthenticated(isLoggedIn);
    } catch (error) {
      console.error("Login failed after register:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsLoggedIn(false);
      onAuthenticated(isLoggedIn);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <View>
      {!isLoggedIn ? (
        <>
          <LoginForm onLogin={handleLogin} />
          <RegisterForm onRegister={handleRegister} />
        </>
      ) : (
        <LogoutButton onLogout={handleLogout} />
      )}
    </View>
  );
};
