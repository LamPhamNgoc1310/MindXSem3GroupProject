import { Route, Routes } from "react-router-dom";
// import {publicRouter, privateRouter} from "./router/router.jsx"
import {privateRouter} from "./router/router.jsx"
import React from "react";
import "./App.css";
import Layout from "./layout/Layout.jsx"

function App() {
  return (
    // <Routes>
    //   <Route path="/" element={<Layout />}>

    //   </Route>
    // </Routes>
    <>
      <Routes>
        {/* {publicRouter.map((route, index) => {
          return (
            <Route path={route.path} element={route.component} key={index} />
          );
        })} */}
        <Route path="/admin" element={<Layout />}>
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
