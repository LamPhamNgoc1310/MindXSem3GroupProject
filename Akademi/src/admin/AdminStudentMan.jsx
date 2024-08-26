import React from "react";
import "./AdminStudentMan.css"

const AdminStudentMan = () => {
  return (
    <div className="container">
      <div className="admin-student-tab">
        <text className="tab-name">Students</text>
        <div >
          <input className="search-box" type="text" placeholder="Search here..." />
        </div>
      </div>
      <div className="student-table">
        
      </div>
    </div>
  );
};

export default AdminStudentMan;
