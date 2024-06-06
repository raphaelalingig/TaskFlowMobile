import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTokens = async () => {
      const tokens = await AsyncStorage.getItem("authTokens");
      if (tokens) {
        setAuthTokens(JSON.parse(tokens));
        setUser(jwtDecode(JSON.parse(tokens).access));
      }
      setLoading(false);
    };
    loadTokens();
  }, []);

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post("http://172.20.8.129:8080/api/token/", {
        email,
        password,
      });
      const data = response.data;
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      await AsyncStorage.setItem("authTokens", JSON.stringify(data));
    } catch (error) {}
  };

  const logoutUser = async () => {
    setAuthTokens(null);
    setUser(null);
    await AsyncStorage.removeItem("authTokens");
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: "Success",
      textBody: "You've successfully logged out your account",
    });
  };
  const registerUser = async (email, username, password, password2) => {
    const response = await fetch("http://172.20.8.129:8080/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
        password2,
      }),
    });
  };
  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    registerUser,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
export default AuthContext;
