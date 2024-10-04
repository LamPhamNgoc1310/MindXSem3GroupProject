import React from "react";
import { IoIosSearch } from "react-icons/io";
// import CustomCalendar from '../admin/calendar/CustomCalendar.jsx';
import { LiaUserTieSolid } from "react-icons/lia";
import { PiForkKnife, PiStudent } from "react-icons/pi";
import { CgCalendarDates } from "react-icons/cg";
import Calendar from "./calendar/CustomCalendar.jsx";
import "./Admin.css"

const Admin = () => {
  
  return (
    <div className="admin-container">
      <div className="admin-dash">
        <span className="dash-name">Dashboard</span>
        <div className="search-box">
          <span className="search-icon"><IoIosSearch/></span>
          <input className="search-input" type="text" placeholder="Search here..." />
        </div>
      </div>
      <div className="admin-status">
        <div className="status-component">
          <span className="status-icon"><PiStudent /></span>
          <span className="status-name">Student</span>
          <span className="status-data">2346</span>
        </div>
        <div className="status-component">
          <span className="status-icon"><LiaUserTieSolid /></span>
          <span className="status-name">Teachers</span>
          <span className="status-data">203</span>
        </div>
        <div className="status-component">
          <span className="status-icon"><CgCalendarDates /></span>
          <span className="status-name">Events</span>
          <span className="status-data">64</span>
        </div>
        <div className="status-component">
          <span className="status-icon"><PiForkKnife /></span>
          <span className="status-name">Foods</span>
          <span className="status-data">65k</span>
        </div>
      </div>
      <br />
      <div className="admin-calendar">
        <Calendar/>
      </div>
      
    </div>
  );
};

export default Admin;
