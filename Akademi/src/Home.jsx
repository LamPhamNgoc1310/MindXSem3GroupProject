import React from 'react'
import { BsCalendar4Event } from 'react-icons/bs'
import { FaRegUser } from 'react-icons/fa'
import { FiActivity } from 'react-icons/fi'
import { HiOutlineChatAlt2 } from 'react-icons/hi'
import { IoHomeOutline } from 'react-icons/io5'
import { LiaUserTieSolid } from 'react-icons/lia'
import { PiForkKnife, PiStudent } from 'react-icons/pi'
import { RiHandCoinLine } from 'react-icons/ri'
import "./Home.css"
import { MdSchool } from 'react-icons/md'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='container'>
      {/* sau chuyển hết thẻ a thành thẻ Link */}
      <div className='school-header'>
        <a href=''>
          <span className='school-icon'><MdSchool /></span>
          <span className='school-name'>AKADEMI</span>
        </a>
      </div>
      <div className='navigation'>
        <ul>
          <li>
            <a href=''>
              <span className='icon'><IoHomeOutline /></span>
              <span className='title'>Dashboard</span>
            </a>
          </li>
          <li>
            <a href='/student'>
              <span className='icon'><PiStudent /></span>
              <span className='title'>Students</span>
            </a>
          </li>
          <li>
            <a href=''>
              <span className='icon'><LiaUserTieSolid /></span>
              <span className='title'>Teachers</span>
            </a>
          </li>
          <li>
            <a href=''>
              <span className='icon'><BsCalendar4Event /></span>
              <span className='title'>Event</span>
            </a>
          </li>
          <li>
            <a href=''>
              <span className='icon'><RiHandCoinLine /></span>
              <span className='title'>Finance</span>
            </a>
          </li>
          <li>
            <a href=''>
              <span className='icon'><PiForkKnife /></span>
              <span className='title'>Food</span>
            </a>
          </li>
          <li>
            <a href=''>
              <span className='icon'><FaRegUser /></span>
              <span className='title'>User</span>
            </a>
          </li>
          <li>
            <a href=''>
              <span className='icon'><HiOutlineChatAlt2 /></span>
              <span className='title'>Chat</span>
            </a>
          </li>
          <li>
            <a href=''>
              <span className='icon'><FiActivity /></span>
              <span className='title'>Latest Activity</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="outlet">
        <Outlet/>
      </div>
    </div>
  )
}

export default Home
