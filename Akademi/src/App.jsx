import { Route, Routes } from "react-router-dom";
import { publicRouter, privateRouter } from "./router/router.jsx"
import React from "react";
import "./App.css";
import LayoutTeacher from "./teacher/LayoutTeacher.jsx";
import Layout from "./layout/Layout.jsx"

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <Routes>
        {publicRouter.map((route, index) => {
          return (
            <Route path={route.path} element={route.component} key={index} />
          );
        })}

        {/* mỗi 1 role là 1 layout khác nhau nên để như này nhé ae! */}
        {user.role === 'Teacher' && (
          <Route path="/u" element={<LayoutTeacher />}>
            {privateRouter.teacher.map((route, index) => (
              <Route path={route.path} element={route.component} key={index} />
            ))}
          </Route>
        )}

        {user.role === 'Admin' && (
          <Route path="/admin" element={<Layout/>}>
            {privateRouter.admin.map((route, index) => (
              <Route path={route.path} element={route.component} key={index} />
            ))}
          </Route>
        )}

        {/* <Route path="/" element={<Layout />}>
          {privateRouter.map((route, index) => {
            return (
              <Route path={route.path} element={route.component} key={index} />
            );
          })}
        </Route> */}
      </Routes>
    </>
  );
}

export default App;
