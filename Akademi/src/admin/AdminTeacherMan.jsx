import React, { useState } from "react";
import { FaRegBell } from "react-icons/fa6";
import { PiGear } from "react-icons/pi";
import "./AdminTeacherMan.css";
import { IoIosSearch } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

import teachers from "./data/teachersdata";
import { Link } from "react-router-dom";

function AdminTeacherMan() {
  const [teacherDropdown, setTeacherDropdown] = useState(false);
  // const [teacherInfoClick, setTeacherInfoClick] = useState(false);
  
  const handleTeacherDropdownClick = () => {
    setTeacherDropdown(!teacherDropdown)
  }

  // const handleTeacherAddClick = () => {
  //   setTeacherInfoClick(!teacherInfoClick);
  // }

  return (
    <div className="admin-container">
      <div className="admin-teacherman">
        <div className="teacher-title">Teachers</div>
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
          <button
            className="newest"
            onClick={handleTeacherDropdownClick}
          >
            Newest
          </button>
          <button className="new-teacher">
            <Link to="/admin/teacherman/addteacher">New Teacher</Link> 
            </button>
          {teacherDropdown && (
            <div className="dropdown">
              <ul className="drop-list">
                <li className="item"><button>Thing 1</button></li>
                <li className="item"><button>Thing 2</button></li>
                <li className="item"><button>Thing 3</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>  

      <div className="teachers">
        {
          teachers.map((teacher) => {
            return (
              <div className="teacher-card" key={teacher.id} >
                  <img src={teacher.pfp} alt="" />
                  <button className="teacher-button"><BsThreeDots /></button>
                  <div className="teacher-name">{teacher.name}</div>
                  <div className="teacher-subject">{teacher.subject}</div>
                  <div className="teacher-icons-area">
                    <a href="#" className="teacher-icon"><FaPhoneAlt/></a>
                    <a href="#" className="teacher-icon"><IoIosMail /></a>
                  </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default AdminTeacherMan;
