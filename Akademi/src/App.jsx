import { Route, Routes } from "react-router-dom";
import React from "react";
import "./App.css";
import Home from "./Home";
import AdminStudentMan from "./admin/AdminStudentMan";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/student" element={<AdminStudentMan />} />
      </Route>
    </Routes>
  );
}

export default App;
