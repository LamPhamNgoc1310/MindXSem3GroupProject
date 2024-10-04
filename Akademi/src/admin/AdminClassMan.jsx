import React, { useState } from "react";
import { FaRegBell } from "react-icons/fa6";
import { PiGear } from "react-icons/pi";
import "./AdminClassMan.css";
import { IoIosSearch } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";

import teachers from "./data/teachersdata.js"
import { Link } from "react-router-dom";

function AdminTeacherMan() {

  return (
    <div className="class-container">
      <div className="admin-classman">
        <div className="class-title">Classes</div>
        <div className="header-right-side">
          <button className="header-icon">
            <FaRegBell />
          </button>
          <button className="header-icon">
            <PiGear />
          </button>
          <div className="admin-card">
            <div className="admin-name">Nobita N.</div>
            <div className="admin-role">Admin</div>
          </div>
          <div className="title-image">
            <img src="https://picsum.photos/60" alt="no image yet" />
          </div>
        </div>
      </div>
      <br />
      <div className="header-nav">
        <div className="search-area">
          <div className="search-icon">
            <IoIosSearch />
          </div>
          <input
            className="search-input"
            type="text"
            placeholder="Search here..."
          />
        </div>
        <div className="nav-buttons">
          <button className="new-teacher">
            <Link to="/admin/teacherman/addclass">New Class</Link> 
            </button>
        </div>
      </div>  
      <br />
      <div className="classes">
        {
            teachers.map((teachers) => {
                return (
                    <div className="class-card" key={teachers.id} >
                      <div className="class-button">
                      <button><BsThreeDots /></button>
                      </div>
                      <div className="class-teacher"><b>{teachers.name}</b></div>
                      <div className="class-name">{teachers.subject}</div>
                      <div className="class-studentNo">{teachers.students}</div>
                  </div>
                )
            })
        }

        </div>
    </div>
  )}

export default AdminTeacherMan;
