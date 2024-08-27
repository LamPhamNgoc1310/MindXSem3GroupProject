import { Route, Routes } from "react-router-dom";
import {publicRouter, privateRouter} from "./router/router.jsx"
import React from "react";
import "./App.css";
import Home from "./Home";

function App() {
  return (
    // <Routes>
    //   <Route path="/" element={<Home />}>
    //     <Route path="/student" element={<AdminStudentMan />} />
    //   </Route>
    // </Routes>
    <>
      <Routes>
        {publicRouter.map((route, index) => {
          return (
            <Route path={route.path} element={route.component} key={index} />
          );
        })}
        <Route path="/" element={<Layout />}>
          {privateRouter.map((route, index) => {
            return (
              <Route path={route.path} element={route.component} key={index} />
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
