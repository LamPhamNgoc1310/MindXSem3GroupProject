import React, { useState } from 'react'
import { BsCalendar4Event } from 'react-icons/bs'
import { FaRegUser } from 'react-icons/fa'
import { FiActivity } from 'react-icons/fi'
import { HiOutlineChatAlt2 } from 'react-icons/hi'
import { IoHomeOutline } from 'react-icons/io5'
import { LiaUserTieSolid } from 'react-icons/lia'
import { PiForkKnife, PiStudent } from 'react-icons/pi'
import { RiHandCoinLine } from 'react-icons/ri'
import "./Layout.css"
import { MdSchool } from 'react-icons/md'
import { Col, Row } from 'antd'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  const [activeItem, setActiveItem] = useState('');

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
              <Link className='link' to='/'>
                <span className='icon'><IoHomeOutline /></span>
                <span className='title'>Dashboard</span>
              </Link>
            </li>
            <li className={activeItem === 'Students' ? 'active' : ''} onClick={() => handleItemClick('Students')}>
              <Link className='link' to='/students'>
                <span className='icon'><PiStudent /></span>
                <span className='title'>Students</span>
              </Link>
            </li>
            <li className={activeItem === 'Teachers' ? 'active' : ''} onClick={() => handleItemClick('Teachers')}>
              <Link className='link' to='/'>
                <span className='icon'><LiaUserTieSolid /></span>
                <span className='title'>Teachers</span>
              </Link>
            </li>
            <li className={activeItem === 'Event' ? 'active' : ''} onClick={() => handleItemClick('Event')}>
              <Link className='link' to='/'>
                <span className='icon'><BsCalendar4Event /></span>
                <span className='title'>Event</span>
              </Link>
            </li>
            <li className={activeItem === 'Finance' ? 'active' : ''} onClick={() => handleItemClick('Finance')}>
              <Link className='link' to='/'>
                <span className='icon'><RiHandCoinLine /></span>
                <span className='title'>Finance</span>
              </Link>
            </li>
            <li className={activeItem === 'Food' ? 'active' : ''} onClick={() => handleItemClick('Food')}>
              <Link className='link' to='/'>
                <span className='icon'><PiForkKnife /></span>
                <span className='title'>Food</span>
              </Link>
            </li>
            <li className={activeItem === 'User' ? 'active' : ''} onClick={() => handleItemClick('User')}>
              <Link className='link' to='/'>
                <span className='icon'><FaRegUser /></span>
                <span className='title'>User</span>
              </Link>
            </li>
            <li className={activeItem === 'Chat' ? 'active' : ''} onClick={() => handleItemClick('Chat')}>
              <Link className='link' to='/'>
                <span className='icon'><HiOutlineChatAlt2 /></span>
                <span className='title'>Chat</span>
              </Link>
            </li>
            <li className={activeItem === 'LatestActivity' ? 'active' : ''} onClick={() => handleItemClick('LatestActivity')}>
              <Link className='link' to='/'>
                <span className='icon'><FiActivity /></span>
                <span className='title'>Latest Activity</span>
              </Link>
            </li>
          </ul>
        </div>
      </Col>
      <Col span={19}>
        <Outlet/>
      </Col>
    </Row>
  )
}

export default Layout
