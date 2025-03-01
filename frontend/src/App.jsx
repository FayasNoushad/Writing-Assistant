import React, { useState, useEffect } from "react";
import api from "./helpers/api";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

function App() {
  async function check() {
    try {
      if (!localStorage.getItem("token")) return false;
      const response = await api.get("/user/check");
      return response.data.success;
    } catch {
      return false;
    }
  }
  const [userLoginStatus, setUserLoginStatus] = useState(false);

  useEffect(() => {
    async function fetchLoginStatus() {
      const status = await check();
      setUserLoginStatus(status);
    }
    fetchLoginStatus();
  }, []);

  useEffect(() => {
    const handleStorageChange = async () => {
      const status = await check();
      setUserLoginStatus(status);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      <Header userLogin={userLoginStatus} />
      <Main userLogin={userLoginStatus} />
      <Footer />
    </>
  );
}

export default App;
