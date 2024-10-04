import React from "react";
import {  MdSchool } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import "./Layout.css";
import components from "./layoutcomponents";

function Layout() {
  const [activeItem, setActiveItem] = useState("");

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="layout-container">
      <div className="layout-left">
        <div className="school-header">
          <NavLink to="/">
            <span className="school-icon">
              <MdSchool />
            </span>
            <span className="school-name">AKADEMI</span>
          </NavLink>
        </div>
        <div className="navigation">
          <ul>
            {
             components.map((component, index) => {
              return (
                  <li className={activeItem === component.title ? "active" : ""}
                onClick={() => handleItemClick(component.title)} key={index}>
                    <NavLink className="link" to={component.path}>
                      <span className="icon">
                        {component.icon}
                      </span>
                      <span className="title">{component.title}</span>
                    </NavLink>
                  </li>
              );
             })
            }
          </ul>
        </div>
      </div>

      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
