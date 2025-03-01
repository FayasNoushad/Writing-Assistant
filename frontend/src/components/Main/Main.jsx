import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Auth/Auth";
import Home from "./Home/Home";
import "./Main.css";
import Draft from "./Draft/Draft";

function Main({ userLogin }) {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/register" element={<Auth register={true} />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/:draftId" element={userLogin ? <Draft /> : <Auth />} />
          <Route path="*" element={userLogin ? <Home /> : <Auth />} />
        </Routes>
      </Router>
    </main>
  );
}

export default Main;
