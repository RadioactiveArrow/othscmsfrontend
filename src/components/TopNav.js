import React from 'react';
import '../styles/nav.css'
import {Link, Route } from 'react-router-dom';
import Logout from './Logout';

const TopNav = () => {
	return (
		<nav className="nav">
			<a className="router-link no-hover" href="/" ><h1 className="logo-icon">Tompkins<strong>CMS</strong></h1></a>
			<ul className="nav-links">
				<li className="nav-item pad"><Link className="router-link" to="/" >Dashboard</Link></li>
				<li className="nav-item"><Link className="router-link" to="/logout">Logout</Link></li>
				<Route path="/logout" component={Logout} />
			</ul>
		</nav>
	)
}

export default TopNav;