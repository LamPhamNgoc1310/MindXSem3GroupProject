import React, { useState } from 'react'
import { BsCalendar4Event } from 'react-icons/bs'
import { FaRegBell, FaRegUser } from 'react-icons/fa'
import { FiActivity } from 'react-icons/fi'
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5'
import { PiStudent } from 'react-icons/pi'
import "./LayoutTeacher.css"
import { MdSchool } from 'react-icons/md'
import { Col, Row } from 'antd'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { TfiMarkerAlt } from 'react-icons/tfi'

const LayoutTeacher = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const user = JSON.parse(localStorage.getItem('user'));
  const nav = useNavigate();
  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <Row className='container'>
      <Col span={5}>
        <div className='school-header'>
          <a href='' className='head-1'>
            <span className='school-icon'><MdSchool /></span>
            <span className='school-name'>AKADEMI</span>
          </a>
        </div>
        <div className='navigation'>
          <ul>
            <li className={activeItem === 'Dashboard' ? 'active' : ''} onClick={() => handleItemClick('Dashboard')}>
              <Link className='link' to='/u/dashboard'>
                <span className='icon'><IoHomeOutline /></span>
                <span className='title'>Dashboard</span>
              </Link>
            </li>
            <li className={(activeItem === 'Students' || activeItem === 'Add New Student') ? 'active' : ''} onClick={() => handleItemClick('Students')}>
              <Link className='link' to='/u/students'>
                <span className='icon'><PiStudent /></span>
                <span className='title'>Students</span>
              </Link>
            </li>
            <li className={activeItem === 'Event' ? 'active' : ''} onClick={() => handleItemClick('Event')}>
              <Link className='link' to='/u/event'>
                <span className='icon'><BsCalendar4Event /></span>
                <span className='title'>Event</span>
              </Link>
            </li>
            <li className={activeItem === 'Grades' ? 'active' : ''} onClick={() => handleItemClick('Grades')}>
              <Link className='link' to='/u/grades'>
                <span className='icon'><TfiMarkerAlt /></span>
                <span className='title'>Grades</span>
              </Link>
            </li>
            <li className={activeItem === 'User' ? 'active' : ''} onClick={() => handleItemClick('User')}>
              <Link className='link' to='/u/userTeacher'>
                <span className='icon'><FaRegUser /></span>
                <span className='title'>User</span>
              </Link>
            </li>
            <li className={activeItem === 'Latest Activity' ? 'active' : ''} onClick={() => handleItemClick('Latest Activity')}>
              <Link className='link' to='/u/latest-activity'>
                <span className='icon'><FiActivity /></span>
                <span className='title'>Latest Activity</span>
              </Link>
            </li>
          </ul>
        </div>
      </Col>
      <Col span={19}>
        <Row className='tc-margin-outlet'>
          <div className='tc-sm-header'>
            <div className='tc-sm-name'>
              {activeItem}
            </div>
            <div className='tc-sm-nav'>
              <div className='tc-notice'>
                <FaRegBell />
              </div>
              <div className='tc-setting'>
                <IoSettingsOutline />
              </div>
              <div className='tc-info-layout'>
                <p className='tc-name-layout'>{user.teacherName}</p>
                <p className='tc-role-layout'>{user.role}</p>
              </div>
              <div className="tc-avatar-layout">
                <img src={user.avatar}></img>
                <div className="logout-button" onClick={() => nav('/')}>
                  Đăng xuất
                </div>
              </div>
            </div>
          </div>
        </Row>
        <Outlet context={{ setActiveItem }} />
      </Col>
    </Row>
  )
}

export default LayoutTeacher
