import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
function Header() {
    const navigate = useNavigate();


    function Unset() {
        sessionStorage.removeItem('user_id');
        navigate('/login');
    }
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    if (userDetails == null) {
        navigate('/login');
    }

    return (
        <>
            {/* <!--sidebar wrapper --> */}
            <div className="sidebar-wrapper" data-simplebar="true">
                <div className="sidebar-header">
                    <div>
                        {/* <img src="assets/images/logo-icon.png" className="logo-icon" alt="logo icon" /> */}
                    </div>
                    <div>
                        <h4 className="logo-text"></h4>
                    </div>
                    <div className="toggle-icon ms-auto">
                        {/* <i className='bx bx-arrow-to-left'></i> */}
                    </div>
                </div>
                {/* <!--navigation--> */}
                <ul className="metismenu" id="menu">
                    <li>
                        <NavLink to="/">
                            <div className="parent-icon"><i className="bx bx-home-circle"></i></div>
                            <div className="menu-title">Dashboard</div>
                        </NavLink>
                    </li>
                    <li className="menu-label">Users</li>
                    <li>

                        <NavLink to="/manageusers">
                            <div className="parent-icon"><i className='bx bx-user'></i>
                            </div>
                            <div className="menu-title">Manage users</div>
                        </NavLink>
                    </li>
                    <li className="menu-label">Playlist</li>
                    <li>

                        <NavLink to="/manageplaylists">
                            <div className="parent-icon"><i className="bi bi-list-check"></i>
                            </div>
                            <div className="menu-title">Mange Playlists</div>
                        </NavLink>
                    </li>
                    <li>

                        <NavLink to="/adpool">
                            <div className="parent-icon"><i className="bi bi-cloud-upload"></i></div>
                            <div className="menu-title">Ad Pool</div>
                        </NavLink>
                    </li>

                    <li>

                        <NavLink to="/home">
                            <div className="parent-icon"><i className="bi bi-layers-half"></i></div>
                            <div className="menu-title">Home Setup</div>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/misc">
                            <div className="parent-icon"><i className="bi bi-layers-half"></i></div>
                            <div className="menu-title">Misc.</div>
                        </NavLink>
                    </li>
                </ul>
                {/* <!--end navigation--> */}
            </div>
            {/* <!--start header --> */}
            <header>
                <div className="topbar d-flex align-items-center">
                    <nav className="navbar navbar-expand">
                        <div className="mobile-toggle-menu"><i className='bx bx-menu'></i>
                        </div>
                        {/* <div className="search-bar flex-grow-1">
                                    <div className="position-relative search-bar-box">
                                        <input type="text" className="form-control search-control" placeholder="Type to search..." /> 
                                        <span className="position-absolute top-50 search-show translate-middle-y"><i className='bx bx-search'></i></span>
                                        <span className="position-absolute top-50 search-close translate-middle-y"><i className='bx bx-x'></i></span>
                                    </div>
                                </div> */}
                        <div className="top-menu ms-auto" style={{ marginRight: "auto" }}>
                            <a href="http://190.92.153.226:3000/home"><img style={{ width: "80%" }} src="assets/images/LoginLogo.png" className="logo-icon" alt="logo icon" /></a>
                            <ul className="navbar-nav align-items-center">
                            </ul>
                        </div>
                        <div className="user-box dropdown">
                            <a className="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="assets/images/gear.png" className="user-img" alt="user avatar" />
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <NavLink to="/profile">
                                    <li style={{ cursor: 'pointer' }}><a className="dropdown-item"><i className='bx bx-log-in-circle'></i><span>Profile</span></a>
                                    </li>
                                </NavLink>
                                <NavLink to="/manageplaylists">
                                    <li style={{ cursor: 'pointer' }}><a className="dropdown-item"><i className='bx bx-log-in-circle'></i><span>Manage Playlist</span></a>
                                    </li>
                                </NavLink>
                                <li style={{ cursor: 'pointer' }}><a className="dropdown-item" onClick={Unset}><i className='bx bx-log-out-circle'></i><span>Logout</span></a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
            {/* <!--end header --> */}
            {/* <!--end sidebar wrapper --> */}
        </>
    )
}

export default Header