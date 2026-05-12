import { useContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import { UserContext } from "./context/UserContext";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SignInForm/SignInForm";
import * as authService from "./services/authService";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import LootLog from "./components/LootLog/LootLog";

const App = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1])).user;
      setUser(user);
    }
  }, [setUser]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/lootlog" element={<LootLog />} />
      </Routes>
    </>
  );
};

export default App;