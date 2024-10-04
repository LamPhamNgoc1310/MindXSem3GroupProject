import React from 'react'
import "./AdminSchedule.css"
import { FaRegBell } from 'react-icons/fa6'
import { PiGear } from 'react-icons/pi'
import CustomCalendar from './calendar/CustomCalendar'
function AdminSchedule() {
  return (
    <div className='schedule-container'>
      <div className="admin-schedule">
        <div className="schedule-title">Schedule</div>
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
      <CustomCalendar/>
    </div>
  )
}

export default AdminSchedule
