import React from 'react'
import './Navbar.css'
import menuIcon from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import searchIcon from '../../assets/search.png';
import uploadIcon from '../../assets/upload.png';
import moreIcon from '../../assets/more.png';
import notificationIcon from '../../assets/notification.png';
import userIcon from '../../assets/jack.png';
import {Link} from "react-router-dom";

const Navbar = ({setSideBar}) => {
    return (
        <nav className="navbar">
            <div className="navbar-left navbar">
                <img src={menuIcon} alt="menu" onClick={() => setSideBar(prev=> !prev)} className="menu" />
                <Link to='/'><img src={logo} alt="logo" className="logo"/></Link>
            </div>

            <div className="navbar-center navbar">
                <input alt="search bar" className="search-bar" placeholder="Search" />
                <img src={searchIcon} alt="search icon" />
            </div>

            <div className="navbar-right navbar">
                <img src={uploadIcon} alt="upload icon" />
                <img src={moreIcon} alt="more icon" />
                <img src={notificationIcon} alt="notification icon" />
                <img src={userIcon} className="user-icon" alt="user icon" />
            </div>

        </nav>
    )
}
export default Navbar
